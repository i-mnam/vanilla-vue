import View from './View.js'

const tag = '[TagView]';

const TabView = Object.create(View);

TabView.setup = function (el) {
    this.init(el);

    // this.ulEl = el.querySelector('#tabs');
    // this.bindEvent();
    this.bindClick();

    return this; //무조건 인가보다.
}

// TabView.bindEvent = function () {
//     this.el.addEventListener('click', e => this.onClickChange(e));
// }

TabView.setActiveTab = function (tabName) {
    Array.from(this.el.querySelectorAll('li')).forEach(li => {
        li.className = (li.innerHTML === tabName) ? 'active' : '';
    });
    // todo.. 
    // 해당 데이터를 조회해서 ResultVie에서 다시 render

    // if(tabName)
    // custom : 내꺼에서는 왜 처음만 작동, 검색 후 엔 none이 안풀림..
    this.show();
}

// TabView.onClickChange = function (e) {
//     console.log(tag, 'onClickChange() e = ', e.target.innerHTML);
//     if (e.target.innerHTML === '추천 검색어') {
//         this.emit('@submit', {input:e.target.innerHTML});
//     }
// }

TabView.bindClick = function () {
    Array.from(this.el.querySelectorAll('li')).forEach(li => {
        li.addEventListener('click', e => this.onClick(li.innerHTML));
    });
}

TabView.onClick = function (tabName) {
    console.log(tag, 'onClcik() tabName = ', tabName);
    this.setActiveTab(tabName);
    this.emit('@change', { tabName });
}
export default TabView;