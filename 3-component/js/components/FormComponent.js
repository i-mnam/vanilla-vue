export default {
    template: '#search-form',
    //component가 binding할 DOM ele을 지정해줘야 한다.
    // FormComponent와 이 template가 연결
    props: ['value'],//부모로 부터 받은 값
    data() {
        return {
            // query: '',
            //query는 외부에서도 사용하기 떄문에 FormComponent가 관리하는 것보다 그보다 상위 객체인 app.js에서 생성한 Vue ins에서 관리하는 게 바람직하다.
            // FormCompoment의 query를 vue ins의 query로 설정해둬야 한다.
            inputValue : this.value,
        };
    },
    watch: {
        // property 의 'value' 를 의미함.. value를 감시하겠다는 것
        value(newVal, oldVal) {
            console.log('FormComponent watch newVal = ', newVal, ' oldVal =', oldVal);
            this.inputValue = newVal;
        }
    },
    methods: {
        onSubmit() {
            console.log('FormComponent onSubmit()');// child >> parent 값 보내는 중
            this.$emit('@submit', this.inputValue.trim());
        },
        onKeyup() {
            if (!this.inputValue.length) {
                console.log('FormComponent onKeyup()');
                // this.resetForm()
                this.onReset();
          }
        },
        onReset() {
            console.log('FormComponent onReset()');
            // component 인자인 inputValue 는 따로 지워줘야해
            this.inputValue = '';
            this.$emit('@reset');
        }
    }

}