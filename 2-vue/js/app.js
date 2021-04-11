// vue instance 생성
new Vue({
    el: '#app',//vue ins가 html에 어느 부분에 mount 될 건지 정하는 것
    data: {
        msg: 'hello world'
    },

});

// const FirstTest = {
//     data() {
//         return { msg: 'hello world' }
//     }
// }

// Vue.createApp(FirstTest).mount('#app');