---
title: 비동기를 동기식으로
author: Hyunsu Joo
pubDatetime: 2024-03-29T15:33:05.569Z
slug: sync-to-async
featured: false
draft: true
ogImage: /src/assets/images/js_closure.png
tags:
  - JavaScript
description: 100000개의 데이터를 정렬하는 동안 유저는 사이드 패널을 확인하고 싶어
---

### 동기의 한계 그리고 비동기 등장

100000개의 데이터를 정렬하는 동안 유저는 사이드 패널을 확인하고 싶어
클릭 동작을 일으킨다. 그런데 화면에는 사이드 패널이 열리지 않는다.
왜냐하면 현재 메인스레드는 정렬 작업이 점유 하고 있기 때문에 그 외의 다른 어떤일도 할 수 없다.
자바스크립트의 싱글스레드 특성 때문에 이런 일이 발생한다.
하나의 긴 작업(정렬)을 수행하는 동안, 인터페이스(사이드 패널 열림/닫힘) 가 계속 반응적으로 유지 할 수 있게 하는 것이
비동기 작업이다. 즉 동기 작업의 블로킹 문제를 해결 할 수 있다.

자바스크립트 엔진의 메인스레드는 하나이다 (싱글 스레드) 그러니깐 한번에 하나의 작업만 한다는 것인데,
100000 개의 데이터를 정렬하기 까지 2초 걸린다면, 2초 동안은 다른 작업이 실행 되지 않는다.

이것이 동기식 처리 방식이다.

비동기에서는 blocking 이 아닌 nonblocking 이 가능해진다.
하지만 비동기 처리는 주의 깊게 관리할 필요가 있다. 그렇지 않으면 예상치 못한 문제를 마주하게 된다.
동시에 십만개의 비동기 작업이 호출 된다면, 가용 메모리를 모두 소모하게 되어 Out Of Memory 가 발생할 수 있다.
그래서 비동기 작업의 동시성(concurrency) 을 관리하는 것이 중요하다.
어떤 식의 관리를 말하는 걸까?
한번에 많이 비동기 함수 호출을 하지 않는 것이다. 통제, 제한 해야 한다.
통제, 제한은 실행 할 수 있는 비동기 작업의 개수가 되겠다.

잠깐 JS에서의 예외/오류처리에 대해 먼저 알아 보겠다.

## JS에서의 예외/오류처리

프로그램 실행 전 발생하는 오류 : 구문 오류(Syntax Error)
프로그램 실행 중에 발생하는 오류 : 런타임 오류(Runtime Error) 또는 예외 (Exception)

**JavaScript에서는 Syntax Error가 아닌 모든 에러는 런타임 오류 또는 예외 이다.**

## 오류와 예외는 다르다.

#### Syntax Error는 프로그램 실행 전에 발생하는 오류로, 코드를 실행하기 전에 발생한다.

- 프로그램 실행 전 이기 때문에, 코드 실행이 일어나지 않는다.

```javascript
console.log("Hello, World!")
console.log("Hello, World!")
console.log("Hello, World!")
console.log("Hello, World!" // <-- Syntax Error

```

![syntax_error.png](img_2.png)

#### Type Error는 프로그램 실행 중에 발생 하는 **예외**로, 정상적인 코드는 실행이 된다.

```javascript
console.log("Hello, World!");
console.log("Hello, World!");
console.log("Hello, World!");
console.rog("Hello, World!"); // <-- Type Error
```

![type_error.png](img_1.png)

정적 언어 에서는 위와 같은 타입 에러는 컴파일 시점에 발견 되어 프로그램이 실행 되지 않지만, 동적 언어인 JS는 구문 오류(Syntax Error)를 제외한 모든 오류는 예외로 처리 된다.
이런 예외를 처리해 주지 않으면 이후의 코드 실행이 되지 않는 문제가 생긴다.

---

## Promise의 예외처리

```javascript
function delayError(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      throw new Error("setTimeout error");
    }, ms);
  });
}

delayError(1000).catch(console.log);
```

에러 전파 관점: 에러가 발생한 스코프 또는 호출 스택 내에서 처리된다. 코드 실행 흐름에서 현재 실행 중이 함수 또는 메소드 체인내에서 동작한다.
setTimeout과 같은 비동기적 실행에서 에러가 발생했을 때,

- setTimeout의 콜백함수는 ms 시간이 지난 후 이벤트 루프에 의해 태스크 큐에 넣어진다.
- 콜백이 콜스택에 들어가 실행되는 시점에는 원래 setTimeout을 호출했던 실행 컨텍스트와는 다른 독립적인 새로운 실행 컨텍스트에서 실행 된다.

## Async/await 에서의 에러 처리

- 에러를 다룰 때 async/await 방식의 장점 중 하나는 비동기적 에러 동기적 에러를 모두 지원 해야 한다.
-
-
- try..catch 블록의 동작을 정규화 하여 동기적 throws와 비동기적 프라미스의 거부 두 상황에서 모두 잘 작동하도록 하는 것이다.

### try, catch, finally

return 문을 통해 흐름을 제어 할 수 있다.

```javascript
const func = () => {
  try {
    console.log("try");
    return;
  } catch (err) {
    console.log("catch", err);
  } finally {
    console.log("finally");
  }

  try {
    console.log("second try");
  } catch (err) {
    console.log("second err", err);
  } finally {
    console.log("second finally");
  }
};

func();
```
