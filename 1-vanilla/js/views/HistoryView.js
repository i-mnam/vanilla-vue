// import View from './View.js';
// 이게 아니였어 0ㅁ0..
import KeywordView from './KeywordView.js';

const tag = '[HistoryView]';

const HistoryView = Object.create(KeywordView);

// HistoryView.messages = {
//     NO_KEYWORDS: '검색 이력이 없습니다'
// }
HistoryView.messages.NO_KEYWORDS = '검색 이력이 없습니다';
/**
HistoryView.messages = {
    NO_HISTORY: '최근 검색어가 없습니다'
}

HistoryView.setup = function (el) {
    this.int(el);

    return this;
}

HistoryView.render = function (data = []) {
    this.el.innerHTML = data.length ? this.getHistoryHtml(data) : this.messages.NO_HISTORY;

    this.show();
}

HistoryView.getHistoryHtml = function (data) {
    return data.reduce((prev, curr, index) => {
        prev += `<li data-keyword="${curr.keyword}">
                </li>`;
        return prev;
    }, '<ul class="list">') + '</ul>';
}
 */

// KeywordView의 getKeywordsHtml()를 override 해서 구현 해야함
HistoryView.getKeywordsHtml = function (data) {
    return data.reduce((prevHtml, currItem) => {
        prevHtml += `<li data-keyword="${currItem.keyword}">
            ${currItem.keyword}
            <span class="date">${currItem.date}</span>
            <button class="btn-remove"></button>
        </li>`;
        return prevHtml;
    }, '<ul class="list">') + '</ul>';
}

export default HistoryView;