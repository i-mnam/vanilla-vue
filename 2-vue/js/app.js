
// https://unpkg.com/vue@next >> v3.0.11로 추정
// const FirstTest = {
//     data() {
//         return { msg: 'hello world' }
//     }
// }

// Vue.createApp(FirstTest).mount('#app');

// https://unpkg.com/vue >> v2.x 로 추정

import SearchModel from './models/SearchModel.js';
// vue instance 생성
new Vue({
    el: '#app',//vue ins가 html에 어느 부분에 mount 될 건지 정하는 것
    data: {
        query: '',
        searchResult: [], // 검색결과 초기화
        submitted: false,
    },
    methods: {
        onSubmit(e) {
            console.log('onSubmit()');
            this.search();
        },
        onReset() {
            console.log('onReset()');
            this.query = '';
            // this : Vue Ins를 의미, query : Vue Ins's data.query를 의미함. 
            // todo 검색결과를 숨길 예정.
        },
        onKeyup(e) {
            if (!this.query.length) {
                console.log("onKeyup()");
                this.onReset();
            }
        },
        search() {
            SearchModel.list().then(data => {
                // console.log('search() data = ', data);
                this.submitted = true;
                this.searchResult = data;
            });
        }
    }
});