---
title: 1466. Reorder Routes to Make All Paths Lead to the City Zero
author: Hyunsu Joo
pubDatetime: 2024-04-23
slug: reorder-routes-to-make-all-paths-lead-to-the-city-zero
featured: false
draft: false
ogImage: /src/assets/images/js_closure.png
tags:
  - Leetcode
  - Python
  - Graph
  - Algorithm
description: 무릎을 탁 치게 만들던 문제 였다.
---

## 문제 출처 : [Leetcode 1466. Reorder Routes to Make All Paths Lead to the City Zero](https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/description/)

> 1466. Reorder Routes to Make All Paths Lead to the City Zero
>       There are n cities numbered from 0 to n - 1 and n - 1 roads such that there is only one way to travel between two different cities (this network form a tree). Last year, The ministry of transport decided to orient the roads in one direction because they are too narrow.
>       Roads are represented by connections where connections[i] = [ai, bi] represents a road from city ai to city bi.
>       This year, there will be a big event in the capital (city 0), and many people want to travel to this city.
>       Your task consists of reorienting some roads such that each city can visit the city 0. Return the minimum number of edges changed.
>       It's guaranteed that each city can reach city 0 after reorder.

Example 1:

Input: n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]
Output: 3
Explanation: Change the direction of edges show in red such that each node can reach the node 0 (capital).
Example 2:

Input: n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]
Output: 2
Explanation: Change the direction of edges show in red such that each node can reach the node 0 (capital).
Example 3:

Input: n = 3, connections = [[1,0],[2,0]]
Output: 0

Constraints:

2 <= n <= 5 \* 104
connections.length == n - 1
connections[i].length == 2
0 <= ai, bi <= n - 1
ai != bi

## 풀이 접근법

- 이 문제에서 원하는 것은 어느 도시에서 출발하든 0번 도시로 도착 하게 만들어야 한다.
- 0 에 인접한 노드들은 incoming 과 outgoing 으로 구분할 수 있어서 인접 리스트를 따로 만들어야 겠다 라고 생각했는데,
- 양방향으로 인접 리스트를 만드는 접근이 좋은 아이디어 인 것 같다.
- 양방향 인접리스트를 하는 이유는 0 노드에서 outging 노드가 있어 0을 향하지 않는다면, 0으로 방향을 바꿔 주기 위해 방문을 해야 하므로 양방향 인접리스트를 통해 각 노드를 방문 할 수 있다.

```python
  # 양방향 인접리스트 만들기
        for a,b in connections:
            adjList[a].append(b)
            adjList[b].append(a)

```

- 문제에서 요구하는 방향을 전환해야 하는 구간을 찾아내는 방법은 양방향 인접리스트와 주어진 connections 노드를 비교하여 connections에 있는 방향 이면 방향을 바꿔줘야 한다.

![Reorder-Routes](../images/leetcode_1466.png)

- 왜 connections에 있는 노드가 방향을 바꿔 줘야 하는 지는, 현재 우리가 만든 인접 리스트는 0에서 출발 하는 방향(0--->1)임을 가정 하고 가기 때문이다.
- 즉 0에서 출발 하는 단방향 노드(0--->1) 들은 역으로 0으로 향하게 바꿔 줘야 한다(0 <---1).
- 그래서 현재 가고 있는 방향(0에서 출발)과 connections에 있는 방향과 일치 하다면 answer+1을 한다.
- 0 에서 출발 하여 인접한 노드들을 방문하면서, 출발 노드와 도착노드가 connectios에 존재하는지 확인하는 방법으로는 DFS를 사용할 수 있다.
- DFS로 각 노드를 방문하면서 이미 방문한 노드는 방향을 바꿔야 하는지, 바꾸지 않아도 되는지에 대한 판단이 완료되었으므로 visit set을 사용하여 방문한 노드를 저장한다.
- 그럴 경우의 시간복잡도 O(n)이 된다.

## 소스코드

```python

class Solution:
    def minReorder(self, n: int, connections: List[List[int]]) -> int:
        edges = {(a,b) for a,b in connections}
        adjList = {city:[] for city in range(n)}
        visit = set()
        answer = 0
        # 양방향 인접리스트 만들기
        for a,b in connections:
            adjList[a].append(b)
            adjList[b].append(a)
        #
        visit.add(0)


        def dfs(city):
            nonlocal edges, adjList, visit, answer

            for neighbor in adjList[city]:
                if neighbor in visit:
                    continue
                if (neighbor, city) not in edges:
                    answer+=1
                visit.add(neighbor)
                dfs(neighbor)

        dfs(0)
        return answer

```
