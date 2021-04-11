import FormView from '../views/FormView.js';
import ResultView from '../views/ResultView.js';
import TabView from '../views/TabView.js';
import KeywordView from '../views/KeywordView.js';
import HistoryView from '../views/HistoryView.js';

import SearchModel from '../models/SearchModel.js';
import KeywordModel from '../models/KeywordModel.js';
import HistoryModel from '../models/HistoryModel.js';

const tag = '[MainController]';

export default {
    init() {
        console.log(tag, 'init()');
        FormView.setup(document.querySelector('form'))
            .on('@submit', e => this.onSubmit(e.detail.input))
            // .on('@reset', e => this.onReset(e.detail))   
            .on('@reset', e => this.onResetForm());
        //chainning 을 이용해서 on()을 이어나감 : 이를위해 setup()에서 return 객체를 받아야 했음.

        ResultView.setup(document.querySelector('#search-result'));
        KeywordView.setup(document.querySelector('#search-keyword'))
            .on('@click', e => this.onClickKeyword(e.detail.keyword));

        HistoryView.setup(document.querySelector('#search-history'))
            .on('@click', e => this.onClickHistory(e.detail.keyword))
            .on('@remove', e => this.onRemoveHistory(e.detail.keyword));

        TabView.setup(document.querySelector('#tabs'))
            .on('@change', e => this.onChangeTab(e.detail.tabName));
        ;



        // 선택 탭 정보를 담고있는게 낫겠다 해서 만든다고 함
        this.selectedTab = '추천 검색어';
        // TabView.setActiveTab(this.selectedTab);

        this.renderView();
    },

    // 여러 view들이 있으므로, 한 번에 그려줄 함수가 필요하다.
    renderView() {
        console.log(tag, 'renderView()');
        TabView.setActiveTab(this.selectedTab);

        if (this.selectedTab === '추천 검색어') {
            HistoryView.hide();
            this.fetchSearchKeyword();
        } else {
            KeywordView.hide();
            this.fetchSearchHistory();
        }
        ResultView.hide(); // 이게 꼭 있어야 할까? > 있어야 했따..

    },

    fetchSearchKeyword() {
        KeywordModel.list().then(data => {
            KeywordView.render(data);
        });
    },

    fetchSearchHistory() {
        HistoryModel.list().then(data => {
            // HistoryView.render(data);
            // 윗 줄까지만 하면 DOM이 생성이 되고, 그러고 나서 체이닝을 통해 이벤트를 바인딩 할 수 있음.
            // 이렇게 체이닝 chaining을 해주려면 render()가 return this;
            HistoryView.render(data).bindRemoveBtn();
        });
    },

    search(query) {
        console.log(tag, 'search() query = ', query);

        FormView.setValue(query);

        // 검색할 때 최근 검색어 내역에 이력이 남아야 한다고 생각함
        HistoryModel.add(query);

        // search api promise이기 때문에 then()을 사용할 수 있다.
        SearchModel.list(query).then(data => {
            this.onSearchResult(data);
        });
        // this.onSearchResult([]);
    },

    onSubmit(input) {
        console.log(tag, 'onSubmit() input = ', input);

        // search 시도하는 시점이 중요하다.
        this.search(input);
    },
    // onReset(e) {
    //     console.log(tag, 'onReset() e.target = ', e);
    // }

    onResetForm() {
        console.log(tag, 'onResetForm()');
        // x버튼을 클릭하면 검색폼이 초기화 되고, 검색 결과가 사라진다
        // ResultView.removeRender();

        // ResultView.hide(); //ResultView가 복사한 View의 hide()를 실행한다.
        this.renderView();
    },

    onSearchResult(data) {
        TabView.hide();
        KeywordView.hide();
        HistoryView.hide();
        ResultView.render(data);
    },

    onChangeTab(tabName) {
        this.selectedTab = tabName;
        this.renderView();
    },

    onClickKeyword(keyword) {
        this.search(keyword);
        // FormView.inputEl.value = keyword;
    },

    onClickHistory(keyword) {
        this.search(keyword);
    },

    onRemoveHistory(keyword) {
        console.log(tag, 'onRemoveHistory() keyword = ', keyword);
        HistoryModel.remove(keyword);

        // data 변경 후 화면을 다시 그려주는 함수 호출
        this.renderView();

    }
};