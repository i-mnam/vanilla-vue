// import View from './View.js';
// 이게 아니였어 0ㅁ0..
import KeywordView from './KeywordView.js';

const tag = '[HistoryView]';

const HistoryView = Object.create(KeywordView);

// override 대상을 생각해보자 (내가 한 것 : 여기서 override받아서 바인딩을 구현하려 했는데 강사님은 메인에서 함)
// HistoryView.render = function (data = []) {
//     this.el.innerHTML = data.length ? this.getKeywordsHtml(data) : this.messages.NO_KEYWORDS;
//     this.bindClickEvent();
//     this.bindRemoveClickEvent();
//     this.show();
// }

// HistoryView.bindRemoveClickEvent = function () {
//     Array.from(this.el.querySelectorAll('.btn-remove')).forEach(btn => {
//         btn.addEventListener('click', e => this.onClickRemoveBtn(e));
//     });
// }

// HistoryView.onClickRemoveBtn = function (e) {
//     const { keyword } = e.currentTarget.parentElement.dataset;
//     this.emit('@remove', { keyword });
// }

HistoryView.messages.NO_KEYWORDS = '검색 이력이 없습니다';

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

// binding 되는 시점을 잘 생각해봐야 한다. bindRemoveBtn()이거 호출 시점!
HistoryView.bindRemoveBtn = function () {
    Array.from(this.el.querySelectorAll('button.btn-remove')).forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation(); // !!!! 클릭의 이벤트 전파를 막고
            // 명확하게 '이벤트 전파를 막겠어'라는 의도의 stopPropagation() 함수 사용을 추천 드립니다.
            this.onRemove(btn.parentElement.dataset.keyword);// 엑스 클릭은 알려준다
        });
    });
}

HistoryView.onRemove = function (keyword) {
    this.emit('@remove', { keyword });
    // debugger;
}
export default HistoryView;