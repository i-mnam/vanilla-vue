import FormComponent from "../../3-component/js/components/FormComponent";
import ListComponent from "../../3-component/js/components/ListComponent";
import ResultComponent from "../../3-component/js/components/ResultComponent";

const h1 = document.createElement('h1');

document.body.appendChild(h1);

const viewModel = {};

let model = '';

Object.defineProperty(viewModel, 'model', {
    get() { return model; },
    set(val) {
        model = val;
        h1.innerHTML = model;
    },
});

// viewModel.model;

viewModel.model = 'hello world';

// emit : 방사하다, 토로하다

// event.stopPropagation() 
// event 버블링: 이벤트가 연속하여 발생하는 버블 현상을 의미합니다. 
// 이벤트: 이벤트캡쳐링과 이벤트버블링으로 나타나는데 클릭이 발생한 경우를 예로들면 클릭 시점에 해당 위치에서 이벤트가 발생하고 발생하고 다시 겹쳐진 요소를 올라가면서 해당 엘리먼트의 이벤트를 다시 발생시키는 현상을 의미합니다. 이 경우 의도하지 않은 두 번째 이벤트가 추가로 발생하여 오류가 발생할 수 있습니다. 
// event.stopPropagation(): 이 함수를 사용하면 이벤트 버블링은 Firing 하지 않아 이벤트가 발생되지 않습니다. 즉, 이벤트 버블링을 제거해줌.


// cdn server network
// npm library download


// [ch9.1] 검색폼
// v-model(directive-command지령)를 사용하여 binding
// dom input ele가 vue ins의 query라는 data(변수)와 binding 
// 양방향 binding을 지원하는 directive

// 입력값에 따라 보이고 말고를 정할 수 있는 directive : v-show

// v-on : dom에서 일어나는 이벤트를 listen하는 디렉티브
// v-on:수신할 이벤트.prevent == e.preventDefault()

// <form v-on:submit="onSubmit"></form> directive가 수신할 이벤트를 지정 받고, 바인딩할 함수도 설정받는 것

// v-show="query.length" 참,거짓에 따라 보이고 안보이고를 결정하는 directive


// [ch10.1] 검색결과
// v.if 조건식이 참일 경우에만 해당 ele을 출력해주는 directive
// v.else 없는 경우

// v-for="item in data.x"
// v-bind:src="item.image"


// [11.1] 탭
// <li v-for="tab in tabs" v-bind:class="{active: tab === selectedTab}">
// v-bind:class 클래스 속성에 바인드 할건데, 후자 조건을 만족하면 active 값을 바인딩한 속성에 부여하겠다는 것

// vue instance 라입프사이클에 따라 호출되는 함수 존재 배움 e.g.) created() : 생성될 때 호출되는 함수


// [11.3] 

// !!!! 초기화의 중요성에 대해 배움
// new Vue({
//     el: '#app',//vue ins가 html에 어느 부분에 mount 될 건지 정하는 것
//     data: {
//         ...
//         searchResult: [], // 검색결과 초기화
//         submitted: false,
//         selectedTab: '',
//         ...
//     이렇게 vue ins의 data에 초기화를 하지 않는 데이터는 view 쪽에서 바인딩할 때 최초 1회만 되고.. 그 이후로는 다이나믹하게 작동을 못한다. ㅠㅠ
//     data를 초기화 한 후에는 동적으로 벨류에 대해 view를 작동시켜준다.. 
//<li v-for="tab in tabs" v-on:click="onClickTab(tab)">
// 바인딩하는 함수에 parameter를 넣을 수 있었다.


// [12]
// <li v-for="item, index in keywords">
// item에 객체를 담아올 수 있고 index를 두 번째 인자로 달 수 있다.

// fetchKeyword() 와 같이 함수를 언제 호출해야하는지 잘 생각해봐야 한다.

// html 에 vue.js 를 통해 정말로 완전한 view 기능을 html 페이지 혼자서 담당하고 있다. > 그래서 짧다고, 편하다고(???) 느끼는 게 큰거 같다. 


// [13.3]
// <button v-on:click.stop="onClickRemoveHistory(item.keyword)" 
// 클릭을 아무리 해도 remove작동안 안먹혀서 e.preventDefault를 해봤지만 여전히 작동 안되었음 e.stopPropagation()이거만 버블링을 제거해줌..



// [14.1] Vue Component 
// component 화면의 구조(header, footer, sidebar,,,) 를 module 별로 나눈 것, 그리고 그 대상 자체와 그 하위에 인풋창 div 등등을 모두 component라고 부른다.
// vue.js에서 제공하는 component 구조는 3가지: HTML, JS(component logic), CSS 
// vue파일 == component 파일


// [14.2] FormComponent 구현 1
// html DOM element 기준 component를 분리하여 및 html-component를 바인딩한다.
// FormComponent.js 생성
// component를 메인 js에 component로 등록
// component로 등록할 때 사용한 key 는 directive가 되어 html에서 호출하여 사용한다.
//    <!--form 있던 곳 : app.js의 component로 설정한 key값으로 directive 사용-->
//      <search-form v-bind:??="query"></search-form>

// <template id="search-form">
//    <form v-on:submit.prevent="onSubmit">
//        <input type="text" v-model="inputValue" 
// ...
// </template>

// index.html 
// <search-form></search-form>
// <template></template>
// app.js
// *Component.js

// search-form directive에서 vue directive 중 bind 디렉티브를 사용해서 search-form 컴포넌트의(template > FormComponent) ??을 vue ins의 query로 연결 설정하겠다.
    // ...
    // props: ['value'],//부모로 부터 받은 값
    // data() {
    //     return {
    //         inputValue : this.value,
    //     };
    // },
    // ...
// 위처럼 사용하여 vue ins와 연결 : 따라서 input에 그냥 값만 입력하고 enter안눌렀을 땐, vue ins에서는 query에 값이 없고, view 쪽과 바인딩한 template > component의 query에서만 나옴


// [14.3]  FormComponent 구현 2
// component에서 발생한 이벤트로인한 데이터 parent에게 전달하기
// $emit() : child > parent 
// [FormComponent.js  자식] this.$emit('@submit', this.inputValue.trim());
// [index.html 바인딩정보]  <search-form v-bind:value="query" v-on:@submit="onSubmit"></search-form>
// [app.js 부모] onSubmit(query) { this.query = query; this.search(); },

// <search-form v-bind:value="query" v-on:@submit="onSubmit" v-on:@reset="onReset"></search-form>
// v-bind는 parent(query)에서 child(value)로 바인딩해서 값을 전달
// v-on은 child에서 parent로 이벤트 및 값을 바인딩해서 값을 전달하는 것.


// 원래 e.g. : this.emit('@submit', {input: this.inputEl.value});
// FormView.setup(document.querySelector('form'))
//             .on('@submit', e => this.onSubmit(e.detail.input))
//             .on('@reset', e => this.onResetForm());


// [14.4] FormComponent 구현 
// component 따기 > template 따기 > component정보에 맞춰 directive만들기 > v-bind(parent > child 정보전달), v-on(child > parent event와 data 전달)
// ResultComponent.js 
// <search-result v-bind:data="searchResult" v-bind:query="query"></search-result>


// [14.5] ListComponent
// 추천 검색 결과와 최근 검색 결과를 공유하는 component를 만들음
// template 정보를 app의 component에 등록
// view 에 directive, template 선언
// directive에서 자식용, 부모용 변수명 확정
// template에서 자식용 변수명으로 수정 및 component에서 발생할 이벤트 확인
// component에서 event 등록 및 로직 작업
// directive에 이벤트 바인딩 등록 
// 부모 vue instance에서 이벤트 올바르게 작동하는지 확인

// v-on:click.stop="onClickRemoveHistory(item.keyword)" 
// 이였던 게,  component vue로 들어오니 
// directive에서는 v-on:@remove="onClickRemoveHistory"
// 이렇게 깔끔해졌다.
// templated 에서는 똑같다. v-on:click.stop="onRemoveHistory(item.keyword)" 


// [14.5] ListComponent 구현2
// template code 안에 v-if="xx" 보기 힘듬
// computed : 함수 이지만, template에서는 변수처럼 사용가능
// 코드의 중복 해결 , 가독성 높임
// watch : view model을 감시하고 있다가 특정 값이 변경되면, 어떤 행동을 하는 ...속성..

// 마지막으로 탭을 구현하는데 생각보다 오래걸림 / 이유 : props에 사용할 것은 camel도, -dash 도 사용하지 말아야 겠다. 오류에는 안잡히지만 오류가 나와서 class="active" < 이 연산이 안되었다..


