import SearchModel from './models/SearchModel.js';
import KeywordModel from './models/KeywordModel.js';
import HistoryModel from './models/HistoryModel.js';

new Vue({
    el: '#app',//vue ins가 html에 어느 부분에 mount 될 건지 정하는 것
    data: {
        query: '',
        searchResult: [], // 검색결과 초기화
        submitted: false,
        selectedTab: '', // !!!! 초기화의 중요성 view 쪽이 동적으로 작동하려면 초기화해두자
        tabs: ['추천 검색어', '최근 검색어'],
        keywords: [], // 추천 검색어 초기화
        history: [], // 최근 검색어 초기화
    },
    created() {
        console.log('created()');// vue ins가 생성될 때, 호출되는 라이프사이클에 따라 호출되는 함수
        this.selectedTab = this.tabs[0];
        this.fetchKeyword();
        this.fetchHistory();
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
                console.log('onKeyup()');
                this.onReset();
            }
        },
        search() {
            SearchModel.list().then(data => {
                this.submitted = true;
                this.searchResult = data;
            });
        },
        onClickTab(tab) {
            console.log('onChangeTab()', tab);
            this.selectedTab = tab;
        },
        fetchKeyword() {
            console.log('fetchKeyword()');
            KeywordModel.list().then(data => {
                this.keywords = data;
            });
        },
        onClickKeyword(keyword) {
            console.log('onClickKeyword()');
            this.query = keyword;
            // this.onSubmit();
            this.search();
        },
        fetchHistory() {
            console.log('fetchHistory()');
            HistoryModel.list().then(data => {
                this.history = data;
            });
        },
        // onClickHistory(keyword) {
        //     console.log('onClickHistory() keyword = ', keyword);
        //     this.query = keyword;
        //     this.search();
        // }
        // onRemoveHistory(keyword) {
        //     console.log('onRemoveHistory()');
        //     SearchModel.remove(keyword).list().then(data => {
        //         this.history = data;
        //     })
        // }
    }
});