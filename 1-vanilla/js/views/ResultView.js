import View from './View.js'

const tag = '[ResultView]';

const ResultView = Object.create(View);

ResultView.messages = {
    NO_RESULT : '검색 결과가 없습니다.'
}

ResultView.setup = function (el) {
    this.init(el);
}

// 검색결과 데이터를 뿌려주기 위해서 필요한 render
ResultView.render = function(data = []) {
    console.log('el = ', this.el);
    console.log(tag, 'render()', data);
    // this.el.innerHTML = data.length ? this.getSearchResultsHtml(data) : '검색 결과가 없습니다.';
    this.el.innerHTML = data.length ? this.getSearchResultsHtml(data) : this.messages.NO_RESULT;
    this.show();
}

ResultView.getSearchResultsHtml = function (data) {
    // debugger;
    return data.reduce((html, item) => {
        html += this.getSearchItemHTML(item);
        return html;
    }, '<ul>') + '</ul>';
}

ResultView.getSearchItemHTML = function (item) {
    return `<li>
        <img src="${item.image}">
        <p>${item.name}</p>
        </li>`
}

// ResultView.removeRender = function() {
//     console.log(tag, 'removeRender() el = ', this.el);
//     this.hide();
// }
export default ResultView;