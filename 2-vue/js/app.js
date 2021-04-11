import SearchModel from './models/SearchModel.js';

new Vue({
    el: '#app',//vue ins가 html에 어느 부분에 mount 될 건지 정하는 것
    data: {
        query: '',
        searchResult: [], // 검색결과 초기화
        submitted: false,
        selectedTab: '', // !!!! 초기화의 중요성 view 쪽이 동적으로 작동하려면 초기화해두자
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
        // onClickTab(e) {
        //     console.log('onClickTab() selectedTab = ', this.selectedTab);
        //     console.log('onClickTab() tf = ', e.currentTarget.innerHTML.trim());
        //     this.selectedTab = e.currentTarget.innerHTML.trim();
        //     // element들이 vue 쪽에서 reloading이 안되서 속성 벨류들이 변곧ㅇ이 없어
        //     // !!!! data에 초기화를 안해뒀더니.. 작동을 안하고 있네 ㅠ
        //     // view 쪽에서는 data 하위의 값들에 대해서만 인식이 가능한 것 같다.
        // }
    }
});