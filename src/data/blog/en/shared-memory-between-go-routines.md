---
author: You
pubDatetime: 2025-08-13T08:00:00.000Z
title: The way shared memory between Go routines with examples
slug: shared-memory-between-go-routines
description: A practical guide to safely sharing memory between Go goroutines using sync primitives, channels, and patterns.
tags: [go, concurrency, memory]
lang: en
---

Goroutines are lightweight threads in Go. They can access the same memory space which makes communication powerful but dangerous without proper synchronization.

## Table of contents

## TL;DR
- Use channels to transfer ownership of data when possible.
- If you must share memory, guard it with `sync.Mutex`/`sync.RWMutex`.
- Prefer `atomic` for hot counters.

## Example 1 — Share memory with Mutex
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

## Example 2 — `sync.RWMutex` for read-heavy data
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

## Example 3 — Ownership via channels (no shared writes)
```go
package main

import (
	"fmt"
)

type msg struct{ n int }

func main() {
	ch := make(chan msg)
	go func() { // producer owns the value until send
		for i := 0; i < 3; i++ {
			ch <- msg{n: i}
		}
		close(ch)
	}()
	for m := range ch { // consumer owns after receive
		fmt.Println(m.n)
	}
}
```

## Example 4 — Atomic counter
```go
var counter atomic.Int64

func incr() { counter.Add(1) }
```

## Deadlock and race overview
- Deadlock: all goroutines waiting. Keep lock order consistent and avoid holding locks while sending on channels.
- Data race: two goroutines access same location concurrently with at least one write and without synchronization. Detect with `go test -race`.

## Mermaid: communication vs shared memory
```mermaid
graph LR
  A[goroutine A] -- lock/unlock --> M[(shared memory)]
  B[goroutine B] -- lock/unlock --> M
  A -. send .-> C((channel))
  B <-. recv .- C
```

## Takeaways
- Prefer channels to move data; use locks or atomics for shared state.
- Keep critical sections small; avoid blocking operations while holding locks.
- Always test with the race detector in CI.