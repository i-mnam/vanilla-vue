
// https://unpkg.com/vue@next >> v3.0.11로 추정
// const FirstTest = {
//     data() {
//         return { msg: 'hello world' }
//     }
// }

// Vue.createApp(FirstTest).mount('#app');

// https://unpkg.com/vue >> v2.x 로 추정
// vue instance 생성
new Vue({
    el: '#app',//vue ins가 html에 어느 부분에 mount 될 건지 정하는 것
    data: {
        query: '',
    },
    methods: {
        onSubmit(e) {
            // debugger;
        }
    }
});