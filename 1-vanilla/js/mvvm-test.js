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

// event.stopPropagation() 
// event 버블링: 이벤트가 연속하여 발생하는 버블 현상을 의미합니다. 
// 이벤트: 이벤트캡쳐링과 이벤트버블링으로 나타나는데 클릭이 발생한 경우를 예로들면 클릭 시점에 해당 위치에서 이벤트가 발생하고 발생하고 다시 겹쳐진 요소를 올라가면서 해당 엘리먼트의 이벤트를 다시 발생시키는 현상을 의미합니다. 이 경우 의도하지 않은 두 번째 이벤트가 추가로 발생하여 오류가 발생할 수 있습니다. 
// event.stopPropagation(): 이 함수를 사용하면 이벤트 버블링은 Firing 하지 않아 이벤트가 발생되지 않습니다. 즉, 이벤트 버블링을 제거해줌.


// cdn server network
// npm library download


// ch9.1
// v-model(directive-command지령)를 사용하여 binding
// dom input ele가 vue ins의 query라는 data(변수)와 binding 
// 양방향 binding을 지원하는 directive

// 입력값에 따라 보이고 말고를 정할 수 있는 directive : v-show

// v-on : dom에서 일어나는 이벤트를 listen하는 디렉티브
// v-on:수신할 이벤트.prevent == e.preventDefault()

// <form v-on:submit="onSubmit"></form> directive가 수신할 이벤트를 지정 받고, 바인딩할 함수도 설정받는 것