---
author: 游钓四方
draft: false
featured: false
category: technology
pubDatetime: 2024-08-14T20:40+08:00
title: 写一个骑行页面(二)
slug: CyclingPage2
ogImage: https://cos.lhasa.icu/ArticlePictures/3138bbfa27873a47be243177e9865ac.png_81
tags:
  - Update
  - 统计
  - 开源
  - JavaScript

description: 在前几天写的数据展示页面中，日历与JSON数据的时间处理依赖于本地时区的getDay()和setDate()方法。然而，博客部署在GitHub Pages，时区的不同导致日历出现了显示偏差
---

在前几天写的数据展示页面中，日历与JSON数据的时间处理依赖于本地时区的getDay()和setDate()方法。然而，博客部署在GitHub Pages，时区的不同导致日历出现了显示偏差

## 本地时间异常

涉及函数：getStartDate

原代码：

这里的getDay()和setDate()方法是基于Github本地时区，不细心

```js
function getStartDate(today, daysOffset) {
    const currentDayOfWeek = today.getDay();
    const daysToMonday = (currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1); 
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - daysToMonday - daysOffset); 
    startDate.setDate(startDate.getDate() - (startDate.getDay() === 0 ? 6 : startDate.getDay() - 1)); 
    return startDate;
}
```

改进后：

修改后：采用getUTCDay()和setUTCDate()方法，使用UTC时间来保证时间处理的一致性

```js
function getStartDate(today, daysOffset) {
    const currentDayOfWeek = today.getUTC11Day();
    const daysToMonday = (currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1);
    const startDate = new Date(today);
    startDate.setUTCDate(today.getUTCDate() - daysToMonday - daysOffset);
    return startDate;
}
```

## JSON数据与日历数据两者时区不一致

```js

// 涉及函数：generateCalendar

// 原代码：

// 在与JSON日期数据进行比较时，由于时区问题，日历的显示存在错位

const todayStr = getChinaTime().toISOString().split('T')[0];
let currentDate = new Date(startDate);

// 改进后：

// 将currentDate时间归零，避免由于时区差异导致的日期比较错误

const todayStr = getChinaTime().toISOString().split('T')[0];
let currentDate = new Date(startDate);
currentDate.setUTCHours(0, 0, 0, 0);
```

## 日期显示与更新逻辑异常

涉及函数：createDayContainer

同上，本地时间异常

```js
// 原代码：
dateNumber.innerText = date.getDate();

// 改进后
dateNumber.innerText = date.getUTCDate();
```

## 异步打字机时区异常

涉及函数：displayCalendar

同上，本地时间异常

```js
// 原代码：
currentDate.setDate(currentDate.getDate() + 1);

// 改进后
currentDate.setUTCDate(currentDate.getUTCDate() + 1);
```

## UPDATE 日历交互动画

1.默认显示当天日期，不显示球体

2.光标悬浮其他日历时，隐藏当天日期，显示球体，反之亦然

3.整体主题色为：rgb(36, 36, 40)

4.日历的所有日期下添加2px厚下划线

```js
function createDayContainer(date, activities) {
    const dayContainer = document.createElement('div');
    dayContainer.className = 'day-container';

    const dateNumber = document.createElement('span');
    dateNumber.className = 'date-number';
    dateNumber.innerText = date.getUTCDate();
    dayContainer.appendChild(dateNumber);

    const activity = activities.find(activity => activity.activity_time === date.toISOString().split('T')[0]);
    // console.log(processedActivities);
    if (activity) processedActivities.push(activity);

    // 根据骑行距离设置球的大小
    const ballSize = activity ? Math.min(parseFloat(activity.riding_distance) / 4, 24) : 2;

    const ball = document.createElement('div');
    ball.className = 'activity-indicator';
    ball.style.width = `${ballSize}px`;
    ball.style.height = `${ballSize}px`;
    if (!activity) ball.classList.add('no-activity');
    ball.style.left = '50%';
    ball.style.top = '50%';
    dayContainer.appendChild(ball);

    dayContainer.addEventListener('mouseenter', () => {
        if (date.toDateString() === new Date().toDateString()) {
            dateNumber.style.opacity = '0';
            ball.style.opacity = '1';
        } else {
            if (todayContainer) {
                todayContainer.querySelector('.date-number').style.opacity = '0';
                todayContainer.querySelector('.activity-indicator').style.opacity = '1';
            }
        }
    });
    dayContainer.addEventListener('mouseleave', () => {
        if (date.toDateString() === new Date().toDateString()) {
            dateNumber.style.opacity = '1';
            ball.style.opacity = '0';
        } else {
            if (todayContainer) {
                todayContainer.querySelector('.date-number').style.opacity = '1';
                todayContainer.querySelector('.activity-indicator').style.opacity = '0';
            }
        }
    });

    if (date.toDateString() === new Date().toDateString()) {
        todayContainer = dayContainer;
        dayContainer.classList.add('today');
        ball.style.backgroundColor = '#242428';
        dateNumber.style.color = '#242428';
        dateNumber.style.opacity = '1';
        ball.style.opacity = '0';
    }
    return dayContainer;
}
```