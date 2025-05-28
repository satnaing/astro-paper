---
author: 游钓四方
draft: false
featured: false
category: technology
pubDatetime: 2024-07-27T09:50+08:00
title: 利用Go+Github Actions写个定时RSS爬虫
slug: GrabLatestRSS
ogImage: https://cos.lhasa.icu/ArticlePictures/1722043714404.jpg_81
tags:
  - Golang
  - Github Actions
  - COS
  - 爬虫
  - 自动化

description: 说起这事，还是受一位博友的启发“1900” 他的左邻右舍页面很棒，决定模仿一下
---

说起这事，还是受一位博友的启发<a href="https://1900.live/links" target="_blank">“1900”</a>他的左邻右舍页面很棒，决定模仿一下

起初，我打算使用 COS 和 GitHub Actions，但在测试过程中发现 GitHub 的延迟非常高，验证和文件写入速度极慢，频频失败。干脆直接上 GitHub 自产自销。

## 大致思路
```plaintext
main()
│
├── readFeedsFromGitHub()
│   ├── GitHub API 调用
│   │   ├── 读取 rss_feeds.txt 文件
│   │   └── 处理文件报错
│   └── Return
│
├── fetchRSS()
│   ├── 遍历 RSS
│   │   ├── HTTP GET 请求
│   │   └── 处理请求错误
│   ├── 解析 RSS
│   │   ├── 清理 XML 内容中的非法字符
│   │   ├── 提取域名
│   │   └── 格式化并排序
│   └── Return
│
└── saveToGitHub()
    ├── GitHub API 调用
    │   ├── 保存到 _data/rss_data.json 供 Jekyll 调用
    │   └── 处理错误
    └── Return
```

由于用 Go 搬砖，所有的包、类型和方法均可在 GitHub API 客户端库的第 39 版文档查询

关于 Github API 有一点需要注意，配置好环境变量后，Token 操作仓库需要有一定的权限，务必启用 Read and write permissions 读取和写入权限


```go
go mod init github.com/achuanya/Grab-latest-RSS
// Go-GitHub v39
go get github.com/google/go-github/v39/github
// RSS 和 Atom feeds 解析库
go get github.com/mmcdole/gofeed
// OAuth2 认证和授权
go get golang.org/x/oauth2
```

## Go RSS 爬虫 Code
```go
package main

import (
	"bufio"
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"regexp"
	"sort"
	"sync"
	"time"

	"github.com/google/go-github/v39/github"
	"github.com/mmcdole/gofeed"
	"golang.org/x/oauth2"
)

const (
	maxRetries    = 3                // 最大重试次数
	retryInterval = 10 * time.Second // 重试间隔时间
)

type Config struct {
	GithubToken      string // GitHub API 令牌
	GithubName       string // GitHub 用户名
	GithubRepository string // GitHub 仓库名
}

// 用于解析 avatar_data.json 文件的结构
type Avatar struct {
	Name   string `json:"name"`   // 用户名
	Avatar string `json:"avatar"` // 头像 URL
}

// 爬虫抓取的数据结构
type Article struct {
	DomainName string `json:"domainName"` // 域名
	Name       string `json:"name"`       // 博客名称
	Title      string `json:"title"`      // 文章标题
	Link       string `json:"link"`       // 文章链接
	Date       string `json:"date"`       // 格式化后的文章发布时间
	Avatar     string `json:"avatar"`     // 头像 URL
}

// 初始化并返回配置信息
func initConfig() Config {
	return Config{
		GithubToken:      os.Getenv("TOKEN"), // 从环境变量中获取 GitHub API 令牌
		GithubName:       "achuanya",         // GitHub 用户名
		GithubRepository: "lhasa.github.io",  // GitHub 仓库名
	}
}

// 清理 XML 内容中的非法字符
func cleanXMLContent(content string) string {
	re := regexp.MustCompile(`[\x00-\x1F\x7F-\x9F]`)
	return re.ReplaceAllString(content, "")
}

// 尝试解析不同格式的时间字符串
func parseTime(timeStr string) (time.Time, error) {
	formats := []string{
		time.RFC3339,
		time.RFC3339Nano,
		time.RFC1123Z,
		time.RFC1123,
	}

	for _, format := range formats {
		if t, err := time.Parse(format, timeStr); err == nil {
			return t, nil
		}
	}
	return time.Time{}, fmt.Errorf("unable to parse time: %s", timeStr)
}

// 将时间格式化为 "January 2, 2006"
func formatTime(t time.Time) string {
	return t.Format("January 2, 2006")
}

// 从 URL 中提取域名，并添加 https:// 前缀
func extractDomain(urlStr string) (string, error) {
	u, err := url.Parse(urlStr)
	if err != nil {
		return "", err
	}
	domain := u.Hostname()
	protocol := "https://"
	if u.Scheme != "" {
		protocol = u.Scheme + "://"
	}
	fullURL := protocol + domain

	return fullURL, nil
}

// 获取当前的北京时间
func getBeijingTime() time.Time {
	beijingTimeZone := time.FixedZone("CST", 8*3600)
	return time.Now().In(beijingTimeZone)
}

// 记录错误信息到 error.log 文件
func logError(config Config, message string) {
	logMessage(config, message, "error.log")
}

// 记录信息到指定的文件
func logMessage(config Config, message string, fileName string) {
	ctx := context.Background()
	client := github.NewClient(oauth2.NewClient(ctx, oauth2.StaticTokenSource(&oauth2.Token{
		AccessToken: config.GithubToken,
	})))

	filePath := "_data/" + fileName
	fileContent := []byte(message + "\n\n")

	file, _, resp, err := client.Repositories.GetContents(ctx, config.GithubName, config.GithubRepository, filePath, nil)
	if err != nil && resp.StatusCode == http.StatusNotFound {
		_, _, err := client.Repositories.CreateFile(ctx, config.GithubName, config.GithubRepository, filePath, &github.RepositoryContentFileOptions{
			Message: github.String("Create " + fileName),
			Content: fileContent,
			Branch:  github.String("master"),
		})
		if err != nil {
			fmt.Printf("error creating %s in GitHub: %v\n", fileName, err)
		}
		return
	} else if err != nil {
		fmt.Printf("error checking %s in GitHub: %v\n", fileName, err)
		return
	}

	decodedContent, err := file.GetContent()
	if err != nil {
		fmt.Printf("error decoding %s content: %v\n", fileName, err)
		return
	}

	updatedContent := append([]byte(decodedContent), fileContent...)

	_, _, err = client.Repositories.UpdateFile(ctx, config.GithubName, config.GithubRepository, filePath, &github.RepositoryContentFileOptions{
		Message: github.String("Update " + fileName),
		Content: updatedContent,
		SHA:     github.String(*file.SHA),
		Branch:  github.String("master"),
	})
	if err != nil {
		fmt.Printf("error updating %s in GitHub: %v\n", fileName, err)
	}
}

// 从 GitHub 仓库中获取 JSON 文件内容
func fetchFileFromGitHub(config Config, filePath string) (string, error) {
	ctx := context.Background()
	client := github.NewClient(oauth2.NewClient(ctx, oauth2.StaticTokenSource(&oauth2.Token{
		AccessToken: config.GithubToken,
	})))

	file, _, resp, err := client.Repositories.GetContents(ctx, config.GithubName, config.GithubRepository, filePath, nil)
	if err != nil {
		if resp.StatusCode == http.StatusNotFound {
			return "", fmt.Errorf("file not found: %s", filePath)
		}
		return "", fmt.Errorf("error fetching file %s from GitHub: %v", filePath, err)
	}

	content, err := file.GetContent()
	if err != nil {
		return "", fmt.Errorf("error decoding file %s content: %v", filePath, err)
	}

	return content, nil
}

// 从 GitHub 仓库中读取头像配置
func loadAvatarsFromGitHub(config Config) (map[string]string, error) {
	content, err := fetchFileFromGitHub(config, "_data/avatar_data.json")
	if err != nil {
		return nil, err
	}

	var avatars []Avatar
	if err := json.Unmarshal([]byte(content), &avatars); err != nil {
		return nil, err
	}

	avatarMap := make(map[string]string)
	for _, a := range avatars {
		avatarMap[a.Name] = a.Avatar
	}

	return avatarMap, nil
}

// 从 RSS 列表中抓取最新的文章，并按发布时间排序
func fetchRSS(config Config, feeds []string) ([]Article, error) {
	var articles []Article
	var mu sync.Mutex     // 用于保证并发安全
	var wg sync.WaitGroup // 用于等待所有 goroutine 完成

	avatars, err := loadAvatarsFromGitHub(config)
	if err != nil {
		logError(config, fmt.Sprintf("[%s] [Load avatars error] %v", getBeijingTime().Format("Mon Jan 2 15:04:2006"), err))
		return nil, err
	}

	fp := gofeed.NewParser()
	httpClient := &http.Client{
		Timeout: 10 * time.Second,
	}

	for _, feedURL := range feeds {
		wg.Add(1)
		go func(feedURL string) {
			defer wg.Done()
			var resp *http.Response
			var bodyString string
			var fetchErr error

			for i := 0; i < maxRetries; i++ {
				resp, fetchErr = httpClient.Get(feedURL)
				if fetchErr == nil {
					bodyBytes := new(bytes.Buffer)
					bodyBytes.ReadFrom(resp.Body)
					bodyString = bodyBytes.String()
					resp.Body.Close()
					break
				}
				logError(config, fmt.Sprintf("[%s] [Get RSS error] %s: Attempt %d/%d: %v", getBeijingTime().Format("Mon Jan 2 15:04:2006"), feedURL, i+1, maxRetries, fetchErr))
				time.Sleep(retryInterval)
			}

			if fetchErr != nil {
				logError(config, fmt.Sprintf("[%s] [Failed to fetch RSS] %s: %v", getBeijingTime().Format("Mon Jan 2 15:04:2006"), feedURL, fetchErr))
				return
			}

			cleanBody := cleanXMLContent(bodyString)

			var feed *gofeed.Feed
			var parseErr error
			for i := 0; i < maxRetries; i++ {
				feed, parseErr = fp.ParseString(cleanBody)
				if parseErr == nil {
					break
				}
				logError(config, fmt.Sprintf("[%s] [Parse RSS error] %s: Attempt %d/%d: %v", getBeijingTime().Format("Mon Jan 2 15:04:2006"), feedURL, i+1, maxRetries, parseErr))
				time.Sleep(retryInterval)
			}

			if parseErr != nil {
				logError(config, fmt.Sprintf("[%s] [Failed to parse RSS] %s: %v", getBeijingTime().Format("Mon Jan 2 15:04:2006"), feedURL, parseErr))
				return
			}

			mainSiteURL := feed.Link
			domainName, err := extractDomain(mainSiteURL)
			if err != nil {
				logError(config, fmt.Sprintf("[%s] [Extract domain error] %s: %v", getBeijingTime().Format("Mon Jan 2 15:04:2006"), mainSiteURL, err))
				domainName = "unknown"
			}

			name := feed.Title
			avatarURL := avatars[name]
			if avatarURL == "" {
				avatarURL = "https://cos.lhasa.icu/LinksAvatar/default.png"
			}

			if len(feed.Items) > 0 {
				item := feed.Items[0]

				publishedTime, err := parseTime(item.Published)
				if err != nil && item.Updated != "" {
					publishedTime, err = parseTime(item.Updated)
				}

				if err != nil {
					logError(config, fmt.Sprintf("[%s] [Getting article time error] %s: %v", getBeijingTime().Format("Mon Jan 2 15:04:2006"), item.Title, err))
					publishedTime = time.Now()
				}

				originalName := feed.Title
				// 该长的地方短，该短的地方长
				nameMapping := map[string]string{
					"obaby@mars": "obaby",
					"青山小站 | 一个在帝都搬砖的新时代农民工":       "青山小站",
					"Homepage on Miao Yu | 于淼":    "于淼",
					"Homepage on Yihui Xie | 谢益辉": "谢益辉",
				}

				validNames := make(map[string]struct{})
				for key := range nameMapping {
					validNames[key] = struct{}{}
				}

				_, valid := validNames[originalName]
				if !valid {
					for key := range validNames {
						if key == originalName {
							logError(config, fmt.Sprintf("[%s] [Name mapping not found] %s", getBeijingTime().Format("Mon Jan 2 15:04:2006"), originalName))
							break
						}
					}
				} else {
					name = nameMapping[originalName]
				}

				mu.Lock()
				articles = append(articles, Article{
					DomainName: domainName,
					Name:       name,
					Title:      item.Title,
					Link:       item.Link,
					Avatar:     avatarURL,
					Date:       formatTime(publishedTime),
				})
				mu.Unlock()
			}
		}(feedURL)
	}

	wg.Wait()
	sort.Slice(articles, func(i, j int) bool {
		date1, _ := time.Parse("January 2, 2006", articles[i].Date)
		date2, _ := time.Parse("January 2, 2006", articles[j].Date)
		return date1.After(date2)
	})

	return articles, nil
}

// 将爬虫抓取的数据保存到 GitHub
func saveToGitHub(config Config, data []Article) error {
	ctx := context.Background()
	client := github.NewClient(oauth2.NewClient(ctx, oauth2.StaticTokenSource(&oauth2.Token{
		AccessToken: config.GithubToken,
	})))

	manualArticles := []Article{
		{
			DomainName: "https://foreverblog.cn",
			Name:       "十年之约",
			Title:      "穿梭虫洞-随机访问十年之约友链博客",
			Link:       "https://foreverblog.cn/go.html",
			Date:       "January 01, 2000",
			Avatar:     "https://cos.lhasa.icu/LinksAvatar/foreverblog.cn.png",
		},
		{
			DomainName: "https://www.travellings.cn",
			Name:       "开往",
			Title:      "开往-友链接力",
			Link:       "https://www.travellings.cn/go.html",
			Date:       "January 01, 2000",
			Avatar:     "https://cos.lhasa.icu/LinksAvatar/www.travellings.png",
		},
	}

	data = append(data, manualArticles...)
	jsonData, err := json.Marshal(data)
	if err != nil {
		return err
	}

	filePath := "_data/rss_data.json"
	file, _, resp, err := client.Repositories.GetContents(ctx, config.GithubName, config.GithubRepository, filePath, nil)
	if err != nil && resp.StatusCode == http.StatusNotFound {
		_, _, err := client.Repositories.CreateFile(ctx, config.GithubName, config.GithubRepository, filePath, &github.RepositoryContentFileOptions{
			Message: github.String("Create rss_data.json"),
			Content: jsonData,
			Branch:  github.String("master"),
		})
		if err != nil {
			return fmt.Errorf("error creating rss_data.json in GitHub: %v", err)
		}
		return nil
	} else if err != nil {
		return fmt.Errorf("error checking rss_data.json in GitHub: %v", err)
	}

	_, _, err = client.Repositories.UpdateFile(ctx, config.GithubName, config.GithubRepository, filePath, &github.RepositoryContentFileOptions{
		Message: github.String("Update rss_data.json"),
		Content: jsonData,
		SHA:     github.String(*file.SHA),
		Branch:  github.String("master"),
	})
	if err != nil {
		return fmt.Errorf("error updating rss_data.json in GitHub: %v", err)
	}

	return nil
}

// 从 GitHub 仓库中获取 RSS 文件
func readFeedsFromGitHub(config Config) ([]string, error) {
	ctx := context.Background()
	client := github.NewClient(oauth2.NewClient(ctx, oauth2.StaticTokenSource(&oauth2.Token{
		AccessToken: config.GithubToken,
	})))

	filePath := "_data/rss_feeds.txt"
	file, _, resp, err := client.Repositories.GetContents(ctx, config.GithubName, config.GithubRepository, filePath, nil)
	if err != nil && resp.StatusCode == http.StatusNotFound {
		errMsg := fmt.Sprintf("Error: %s not found in GitHub repository", filePath)
		logError(config, fmt.Sprintf("[%s] [Read RSS file error] %v", getBeijingTime().Format("Mon Jan 2 15:04:2006"), errMsg))
		return nil, fmt.Errorf(errMsg)
	} else if err != nil {
		errMsg := fmt.Sprintf("Error fetching %s from GitHub: %v", filePath, err)
		logError(config, fmt.Sprintf("[%s] [Read RSS file error] %v", getBeijingTime().Format("Mon Jan 2 15:04:2006"), errMsg))
		return nil, fmt.Errorf(errMsg)
	}

	content, err := file.GetContent()
	if err != nil {
		errMsg := fmt.Sprintf("Error decoding %s content: %v", filePath, err)
		logError(config, fmt.Sprintf("[%s] [Read RSS file error] %v", getBeijingTime().Format("Mon Jan 2 15:04:2006"), errMsg))
		return nil, fmt.Errorf(errMsg)
	}

	var feeds []string
	scanner := bufio.NewScanner(bytes.NewReader([]byte(content)))

	for scanner.Scan() {
		feeds = append(feeds, scanner.Text())
	}

	if err := scanner.Err(); err != nil {
		errMsg := fmt.Sprintf("Error reading RSS file content: %v", err)
		logError(config, fmt.Sprintf("[%s] [Read RSS file error] %v", getBeijingTime().Format("Mon Jan 2 15:04:2006"), errMsg))
		return nil, fmt.Errorf(errMsg)
	}

	return feeds, nil
}

func main() {
	config := initConfig()

	// 从 GitHub 仓库中读取 RSS feeds 列表
	rssFeeds, err := readFeedsFromGitHub(config)
	if err != nil {
		logError(config, fmt.Sprintf("[%s] [Read RSS feeds error] %v", getBeijingTime().Format("Mon Jan 2 15:04:2006"), err))
		fmt.Printf("Error reading RSS feeds from GitHub: %v\n", err)
		return
	}

	// 抓取 RSS feeds
	articles, err := fetchRSS(config, rssFeeds)
	if err != nil {
		logError(config, fmt.Sprintf("[%s] [Fetch RSS error] %v", getBeijingTime().Format("Mon Jan 2 15:04:2006"), err))
		fmt.Printf("Error fetching RSS feeds: %v\n", err)
		return
	}

	// 将抓取的数据保存到 GitHub 仓库
	err = saveToGitHub(config, articles)
	if err != nil {
		logError(config, fmt.Sprintf("[%s] [Save data to GitHub error] %v", getBeijingTime().Format("Mon Jan 2 15:04:2006"), err))
		fmt.Printf("Error saving data to GitHub: %v\n", err)
		return
	}
	fmt.Println("Stop writing code and go ride a road bike now!")
}

```


### Go 生成的 json 数据
```json
[
    {
        "domainName": "https://yihui.org",
        "name": "谢益辉",
        "title": "Rd2roxygen",
        "link": "https://yihui.org/rd2roxygen/",
        "date": "April 14, 2024",
        "avatar": "https://cos.lhasa.icu/LinksAvatar/yihui.org.png"
    },
    {
        "domainName": "https://www.laruence.com",
        "name": "风雪之隅",
        "title": "PHP8.0的Named Parameter",
        "link": "https://www.laruence.com/2022/05/10/6192.html",
        "date": "May 10, 2022",
        "avatar": "https://cos.lhasa.icu/LinksAvatar/www.laruence.com.png"
    }
]
```

### Go 生成的日志

```log
[Sat Jul 27 08:42:2024] [Parse RSS error] https://lhasa.icu: Failed to detect feed type

[Sat Jul 27 08:41:2024] [Get RSS error] https://lhasa.icu: Get "https://lhasa.icu": net/http: TLS handshake timeout
```


## Github Actons 1h/次

```yml
name: ScheduledRssRawler

on:
  schedule:
    - cron: '0 * * * *'
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Set up Go
      uses: actions/setup-go@v3
      with:
        go-version: '1.22.5'

    - name: Install dependencies
      run: go mod tidy
      working-directory: ./api

    - name: Build
      run: go build -o main
      working-directory: ./api

    - name: Run Go program
      env:
        TOKEN: ${{ secrets.KEY }}
      run: ./main
      working-directory: ./api

```

腾讯 COS 也写了一份，Github 有延迟问题就没用，也能用，逻辑上和 Go 是没啥区别

<a href="https://github.com/achuanya/Grab-latest-RSS" target="_blank">Grab-latest-RSS：https://github.com/achuanya/Grab-latest-RSS</a>

<a href="https://cloud.tencent.com/document/product/436/31215" target="_blank">COS Go SDK：https://cloud.tencent.com/document/product/436/31215</a>

[效果页：https://lhasa.icu/links.html](https://lhasa.icu/links.html)