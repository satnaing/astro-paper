title: Dan Abramov가 언급했던 React classComponent 에서 this
author: Hyunsu Joo
pubDatetime: 2024-04-21T15:33:05.569Z
slug: react-classcomponent-this
featured: false
draft: true
ogImage: /src/assets/images/js_closure.png
tags:

- React
- JavaScript
  description: React Conf 2018 에서 리액트 팀은 React의 16.8 버전의 Hook을 소개 했다. 그 배경으로는 Class Component에 대한 몇가지 이슈들을
  해결하기 위한 것이었다. 그 중 하나는 Dan Abramov가 블로그에서도 언급한 React classComponent 에서 this에 대한 이야기이다.

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
