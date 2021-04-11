import SearchModel from './models/SearchModel.js';

new Vue({
    el: '#app',//vue ins가 html에 어느 부분에 mount 될 건지 정하는 것
    data: {
        query: '',
        searchResult: [], // 검색결과 초기화
        submitted: false,
        tabs: ['추천 검색어', '최근 검색어'],
    },
    created() {
        console.log('created()');// vue ins가 생성될 때, 호출되는 라이프사이클에 따라 호출되는 함수
        this.selectedTab = this.tabs[0];
    },
    methods: {
        onSubmit(e) {
            console.log('onSubmit()');
            this.search();
        },
        onReset() {
            console.log('onReset()');
            this.query = '';// this : Vue Ins를 의미, query : Vue Ins's data.query를 의미함. 
            this.submitted = false;
            this.searchResult = [];
        },
        onKeyup(e) {
            if (!this.query.length) {
                console.log("onKeyup()");
                this.onReset();
            }
        },
        search() {
            SearchModel.list().then(data => {
                this.submitted = true;
                this.searchResult = data;
            });
        }
    }
});