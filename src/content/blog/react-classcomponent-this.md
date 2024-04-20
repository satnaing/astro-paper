---
title: Dan Abramov가 언급했던 React classComponent 에서 this <부제-왜 나는 함수형 컴포넌트를 사용하고 있는가?>
author: Hyunsu Joo
pubDatetime: 2024-04-21T15:33:05.569Z
slug: react-classcomponent-this
featured: false
draft: true
ogImage: /src/assets/images/js_closure.png
tags:
  - React
  - JavaScript
description: React Conf 2018 에서 리액트 팀은 React의 16.8 버전의 Hook을 소개 했다. 그 배경으로는 Class Component에 대한 몇가지 이슈들을 해결하기 위한 것이었다. 그 중 하나는 Dan Abramov가 블로그에서도 언급한 React classComponent 에서 this에 대한 이야기이다.
---

class Contract{
constructor(name){
this.name = name
}
doSign(){
console.log("서명인:", this.name)
}
sign(){
//서명을 하면 3초후에 찍히고 싶다.
// var captureName = this.name
console.log("this",this)
setTimeout(()=>{
//여기서의 this는 arrow function을 사용했으므로, 상위 this를 가리킨다.
// 여기서 arrow 함수가 빛을 발한다.
// 그래서 sign() 함수를 호출한 객체를 가리킨다.
console.log("서명인:", this.name) //this.name은 사용자 2가 됨.
},this,1000)

        // solution 1.
        let signBindingFunc = this.doSign.bind(this)
        setTimeout(signBindingFunc, 1000)
    }

}

const contract = new Contract("홍길동")
contract.sign()
contract.name= "사용자 2" //3초 이내 name 변경을 시도
// 개발자 입장에서는 3초 이내 변경된 name을 찍어 내는게 버그 같아 보인다.

// this.name 을 변수에 저장하면, this가 가리키는 객체가 고정이 되어서 인스턴스의 this.name을 수정해도 영향을 받지 않는다. 클로저 현상.
// sign 메서드가 호출된 후 종료되었지만,capturedName이라는 변수가 유지 되는 이유는 callback 함수가 아직 실행되지 않았기 때문이다.
// sign 메서드가 종료되더라도 capturedName은 클로저 공간에 유지된다.
// 클로저를 이용해 sign()할 당시의 값을 고정시킬 수 있다.

//다른 예제
// 객체는 함수를 통해서도 생성할 수 있다.
// 이 함수가 클로저임을 어떻게 설명할 것인가?
// createContract 함수가 실행되면서 sign 함수가 실행되지 않았지만, sign 함수가 실행될 때 name이 유지되는 이유는 무엇인가?
// name변수가 createContact 함수의 실행이 종료 되더라도 3초간 유지가 되었다.
function createContract(name){
const sign = ()=>{
setTimeout(()=>{
console.log("서명인:", name)
} ,3000)
}
return {
sign,
name
}
}
const {sign, name} = createContract("me")
sign()
console.log("name",name)

//마무리
// 이거 궁금함.. 그럼 클래스는 인스턴스 생성과, this에 의해 지속적인 값을 가질 수 있는 건가요?

// 클래스는 인스턴스를 만든다. 인스턴스를 통해서 지속적인 값을 가질 수 있다.
// 외부에서 contact.name을 통해 새로운 값을 할당하거나 접근할 수 있다.
// return 시 변수를 같이 반환 한다.
//
//

함수형 컴포넌트의 props는 내부 변수 이다. 이 변수는 함수가 호출된 다음에 클로저로 캡쳐 되어 있기 때문에, 호출 될 당시의 값을 고정 시키는 특성이 있다.
컨트랙트 컴포넌트는 렌더링 될 당시의 환경을 고정 시킨다. props와 내부 함수가 고정값으로 캡쳐 된다.
그래서 3초 후에 props.name이 다른 어디에선가 변경을 시도하더라도, 3초 후에 찍히는 값은 변경 되지 않는다.
클래스 컴포넌트와 함수 컴포넌트는 랜더링 시점의 환경을 고정할 수 있느냐 없느냐에 따라서 차이가 있다.

클래스 컴포넌트와 함수형 컴포넌트의 차이

- 클래스 컴포넌트 : 리액트 컴포넌트를 상속해야 한다. 인스턴스를 생성한다. 인스턴스는 this를 통해서 가리킨다/
- this는 클래스 메서드가 호출되는 상황에 따라 달라질 수 있다. instance를 가리키거나 전역 객체를 가리킬 수 있다.
- 이런 혼란스러움을 명시적 바인딩인 this를 사용해 this를 고정시킬 수 있다.
- 정확하게는 클래스 컴포넌트의 생성자 함수(construction) 에서 this를 고정 할 수 있다.
- 함수형 컴포넌트 : 함수형 컴포넌트는 함수이기 때문에 상속을 받을 수 없지만, 리액트 Element를 반환한다.
- 함수형 컴포넌트가 반환한 리액트 엘리먼트는 내부 변수에 담긴 콜백을 사용 하기 때문에 언제 라도 의도 한대로 함수가 호출 됩니다. <--의미를 잘 모르겠다.

```text
함수형 컴포넌트가 반환한 리액트 엘리먼트 가 곧 Profile 컴포넌트 재호출 시 내부 변수에 담긴 콜백은 이벤트 핸들러라고 생각되는데,
언제라도 의도한 대로 함수가 호출된다는 의미가 어떤 의도 인지가 잘 모르겠습니다.  제가 유추하기로는 함수형 컴포넌트의 재호출에도
이전 호출시 환경과 (props, state, 이벤트 핸들러 함수) 가 매 렌더링시 같은 일을 하기 때문이라고 생각하는데요.

Profile =>return (<div></div>) =>  jsx => React.createElement() => 리렌더링 => Profile함수 재호출
```

- 함수가 종료되더라도 내부 변수에 담긴 콜백 함수 값이 사라지지 않습 니다.
- 함수형 컴포넌트 내에서 선언된 변수나 함수는 해당 컴포넌트가 렌더링 될 때마다 새로 생성되지 않고, 컴포넌트가 처음 마운트 될 때 생성되고,
- 그 이후로는 메모리에 유지 된다. 이 때 해당 변수나 함수가 참조하는 외부 변수나 상태는 그 값을 유지하고 있게 된다.
- 함수가 종료 되더라도 내부 변수에 담긴 콜백 함수값이 사라지지 않는다. 왜냐하면 클로저에 남아있기 때문이다.
-
- 클래스 컴포넌트: 컴포넌트 새

### 객체는 클래스로 만들 수도 있고 함수로 만들 수도 있는데 용도에 따라 사용한다. 상태가 필요하다면 this 를 가진 클래스를 사용하는것이 간편

### 반면, 특정 상황의 값을 고정시켜야 한다면 함수로 만드는 것이 낫다.

- 클래스는 객체 지향 프로그래밍의 핵심 개념 중 하나로, 상태(state)와 행동(behavior)을 가진 객체를 만드는 템플릿입니다. 클래스를 사용하는 주요 이유 중 하나는 재사용 가능하고, 구조화된 코드를 작성하기 쉽다는 점입니다.
- 클래스는 인스턴스의 상태를 관리하는데 유리하다. `this` 키워드를 사용하여 인스턴스 변수 상태에 접근하고 수정할 수 있다.
- 클래스 내 여러 메서드에서 상태를 공유하고 변경하기에 용이하다.

- 함수를 사용하여 객체를 생성할 경우, 주로 함수가 클로저를 형성하여 외부에서 접근할 수 없는 private 데이터를 유지 할 수 있다. 함수는 데이터를
  캡슐화하고, 특정 상황의 값을 고정시키는 데 사용될 수 있다.

- 클로저를 형성하여 외부에서 접근할 수 없는 private 데이터를 유지하여 캡슐화 하는 예

```javascript
function createCounter() {
  let count = 0;
  return {
    increment() {
      count++;
      console.log(count);
    },
    decrement() {
      count--;
      console.log(count);
    },
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
```

- this는 클래스에서 상태를 관리해 주는데 도움을 주고, closure는 함수에서 내부 상태를 유지해 주는데 도움을 준다. 라고 봐도 되는가?
- 아니면 정환님의 말씀대로 상태가 필요하다면 this를 가진 클래스를, 특정 상황의 값을 고정시켜야 한다면 함수로 만드는 것이 낫다 라고 봐야 하나?
- 둘다 맞나?

- 클래스 컴포넌트는 렌더링 되고 나서도 그 state 를 계속 유지 할 수 있다. this.state를 통해..
- 함수형 컴포넌트는 그냥 함수이기 때문에 한번 실행되고 나면 컨텍스트가 달라진다. 그래서 상태가 없다.
- 클래스 생명 주기 메서드가 함수형에는 없다. 그래서 컴포넌트가 렌더링 되고 나서 뭔가 행동을 하려고 해도 함수 컴포넌트에서는 그런 로직을 담을 수 있는 공간이 없다. (내가 생각했을 때 여기서 말하는 공간이란 생명 주기 함수 처럼 공간이 따로 마련되어 있지 않다는 것)
- 함수 컴포넌트는 state와 마찬가지로 어딘가에 유지할 공간이 없기 때문에 ref 객체도 쓸수 없다.
- 이런 함수 클래스의 한계를 극복하기 위해 훅을 제공한다.

- 아래 함수내에서 name을 변경할 방법이 없다. App함수가 한번 실행되고 나면 name 변수가 없어진다.
- 클로저로 남아 있을 것 같지만 그렇지 않다 .(응? 이건 무슨 소리야 아깐 클로저로 남아 있는 다면서)
- handleChange가 실행되면 클로저가 되더라도 name을 변경 할 수 있는 공간이 없다.

```jsx
function App() {
  const name = "사용자1";
  const handleChange = () => {};
  return <input type="text" value={name} onChange={handleChange} />;
}
export default () => <App />;
```

- 이게 현재 함수 컴포넌트의 문제이다.
- 사용자의 입력값 즉 state 를 관리할 수 있는 공간이 없다.
- 클래스 컴포넌트라면 this.state로 멤버 변수를 사용하는데, 함수 컴포넌트는 인스턴스가 없기 때문에 함수 외부에 저장할 만한 곳을 찾아야 한다.

- 둘째 상태가 바뀌면 함수를 다시 호출해야 한다.
- 상태가 바뀌면 Name을 다시 렌더링 해야 하는데 한 번 호출한 함수를 다시 호출해야 한다. 그런데 현재 위의 코드로는 다시 호출이 불가능하다.

이런 상태에서 훅을 사용하게 되면, 상태도 사용할 수 있고 상태가 변화할 때마다 리렌더링도 같이 되는데 위 두개의 문제를
모두 해결할 수 있다. 일반 컴포넌트에서 훅이 있음으로서 상태를 관리할 수 있게 되었는데 이게 리액트의 역할이라고 볼 수 도 있겠다.
