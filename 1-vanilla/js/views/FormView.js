import View from './View.js'

const tag = '[FormView]'

const FormView = Object.create(View) //View 객체를 복사해옴
// 자바스크립트 언어는 상속을 통해 부모 객체의 기능을 물려받고,
// 본인만의 새로운 기능을 추가할 수 있다.
// 이러한 상속의 기능을 제대로 구현하기 위해서는 Object.create()를 활용 해야 한다!


FormView.setup = function (el) {
    // console.log("instanceof test = ", FormView instanceof View);
    // properties 복사해주는 건데.. Object.create() 한 거랑 중복되는 기능 아닌가???
    // https://velog.io/@thms200/Object.create-

    // console.log("this = ", this);
    this.init(el); 
    this.inputEl = el.querySelector('[type=text]');
    this.resetEl = el.querySelector('[type=reset]');
    this.showResetBtn(false);
    this.bindEvent();

    return this;
}

FormView.showResetBtn = function (show = true) {
    
    this.resetEl.style.display = show ? 'block' : 'none';
}

FormView.bindEvent = function () {

    this.on('submit', e => e.preventDefault());

    this.inputEl.addEventListener('keyup', e => this.onKeyup(e));
    this.resetEl.addEventListener('click', e => this.onClickReset());
}

FormView.onKeyup = function (e) {
    // console.log("show = ", this.inputEl.value.length);
    const enter = 13;
    this.showResetBtn(this.inputEl.value.length);

    // 검색어가 없으면, @reset 이벤트를 방출한다.
    // if (!this.inputEl.value.length) {
    //     console.log('??');
    //     this.emit('@reset', {});
    //     return;
    // }

    // 그냥 이렇게 이벤트 별로 따로따로 구현하는 게 나은가 보다. 다른이벤트에서 결과적으로 같은 동작할 떄에 대해 고민이 있었는데,, 
    // 중복적으로 선언하는구나..
    if(!this.inputEl.value) this.emit('@reset');

    if (e.keyCode !== enter) return;

    // todo...FormView에서는 enter 이벤트를 알려주기만, 전달하기만 하면 됨.. : emit()
    this.emit('@submit', {input: this.inputEl.value});
}

FormView.onClickReset = function () {
    this.emit('@reset');
    this.showResetBtn(false);
}

FormView.setValue = function (value = '') {
    this.inputEl.value = value;
    this.showResetBtn(this.inputEl.value.length);
}
export default FormView;