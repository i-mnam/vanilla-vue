export default {
    template: '#list',
    props: ['data', 'type'],
    // created() {
    //     console.log(this.type);
    // }
    computed : {
        keywordType() {
            return this.type === 'keywords';
        },
        historyType() {
            return this.type === 'history';
        }
    },
    methods : {
        onClickList(keyword) {
            console.log('ListComponent onClickList() keyword =', keyword);

            this.$emit('@click', keyword);
        },
        onRemoveHistory(keyword) {
            console.log('ListComponent onRemoveHistory() keyword =', keyword);
            this.$emit('@remove', keyword);
        }
    },
}