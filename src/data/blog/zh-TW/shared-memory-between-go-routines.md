---
title: 在 Go 中以共享記憶體溝通的方式與範例
author: 你
pubDatetime: 2025-08-13T08:00:00.000Z
description: 介紹在 Go 中多個 goroutine 之間安全共享記憶體的方法，包含鎖、原子操作與以 channel 轉移所有權的模式。
tags: [go, 併發, 記憶體]
lang: zh-tw
---

Goroutine 是 Go 的輕量執行緒。它們共享同一個位址空間，若沒有同步機制就同時讀寫，容易發生資料競賽。

## 目錄

## 重點
- 能用 channel 移交資料所有權時就不要共享寫入。
- 必須共享時，以 `sync.Mutex` 或 `sync.RWMutex` 保護。
- 熱點計數器用 `atomic` 較佳。

## 範例一 — 以 Mutex 保護共享狀態
```go
package main

import (
	"fmt"
	"sync"
)

func main() {
	var (
		mu    sync.Mutex
		count int
		wg    sync.WaitGroup
	)
	for i := 0; i < 5; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for j := 0; j < 1000; j++ {
				mu.Lock()
				count++
				mu.Unlock()
			}
		}()
	}
	wg.Wait()
	fmt.Println("count:", count)
}
```

## 範例二 — 讀多寫少用 `sync.RWMutex`
```go
var (
	mu   sync.RWMutex
	data = make(map[string]int)
)

func read(k string) int {
	mu.RLock()
	defer mu.RUnlock()
	return data[k]
}

func write(k string, v int) {
	mu.Lock()
	data[k] = v
	mu.Unlock()
}
```

## 範例三 — 以 channel 移交所有權（避免共享寫入）
```go
package main

import "fmt"

type msg struct{ n int }

func main() {
	ch := make(chan msg)
	go func() {
		for i := 0; i < 3; i++ {
			ch <- msg{n: i}
		}
		close(ch)
	}()
	for m := range ch {
		fmt.Println(m.n)
	}
}
```

## 範例四 — 原子操作計數器
```go
var counter atomic.Int64

func incr() { counter.Add(1) }
```

## 死結與資料競賽
- 死結：彼此互等。統一鎖取得順序，不要在持鎖期間做阻塞 I/O 或 channel 傳送。
- 資料競賽：兩個 goroutine 同時存取且至少一個是寫入、且未同步。用 `go test -race` 偵測。

## Mermaid：共享記憶體 vs. 訊息傳遞
```mermaid
graph LR
  A[goroutine A] -- lock/unlock --> M[(shared memory)]
  B[goroutine B] -- lock/unlock --> M
  A -. send .-> C((channel))
  B <-. recv .- C
```

## 結論
- 優先使用 channel 傳遞資料；共享狀態則以鎖或原子操作保護。
- 臨界區越小越好；持鎖期間避免阻塞。
- 在 CI 啟用競賽偵測確保安全。