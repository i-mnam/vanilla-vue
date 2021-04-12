import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'
import HistoryModel from './models/HistoryModel.js'

import FormComponent from './components/FormComponent.js';
import ResultComponent from './components/ResultComponent.js';
import ListComponent from './components/ListComponent.js';
import TabComponent from './components/TabComponent.js';

new Vue({
  el: '#app',
  data: {
    query: '',
    submitted: false,
    tabs: ['추천 검색어', '최근 검색어'],
    selectedTab: '',
    keywords: [],
    history: [],
    searchResult: []
  },
  components: {
    'search-form': FormComponent,
    // 실제로 사용할 directive명으로 key 설정
    'search-result': ResultComponent,
    'list': ListComponent,
    'tabs': TabComponent,
  },
  created() {
    this.selectedTab = this.tabs[0]
    this.fetchKeyword()
    this.fetchHistory()

    console.log('[app.js] created() selectedTab=', this.selectedTab);
  },
  methods: {
    // onSubmit(e) {
    //   this.search()
    // },
    onSubmit(query) {
      this.query = query;
      this.search();
    },
    //왜 이제 소용없다고 하나.ㅠ > components
    onKeyup(e) {
      console.log("app.js  oneKeyup()")
      //   if (!this.query.length) {
      //         this.resetForm()
      //   } 
    },
    onReset(e) {
      this.resetForm()
    },
    onClickTab(tab) {
      this.selectedTab = tab
    },
    onClickKeyword(keyword) {
      this.query = keyword;
      this.search()
    },
    onClickRemoveHistory(keyword) {
      console.log('app.js onClickRemoveHistory()')
      HistoryModel.remove(keyword)
      this.fetchHistory()
    },
    fetchKeyword() {
      KeywordModel.list().then(data => {
        this.keywords = data
      })
    },
    fetchHistory() {
      HistoryModel.list().then(data => {
        this.history = data
      })
    },
    search() {
      SearchModel.list().then(data => {
        this.submitted = true
        this.searchResult = data
      })
      HistoryModel.add(this.query)
      this.fetchHistory()
    },
    resetForm() {
      this.query = ''
      this.submitted = false
      this.searchResult = []
    }
  }
})