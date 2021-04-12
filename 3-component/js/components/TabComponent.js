export default {
    template: '#tabs',
    props: ['data', 'tabsdata',],
    // created() {
    //     Array.from(this.data).forEach(tab => {
    //         console.log(tab.length, tab);
    //     });
    //     console.log('[TabComponent] created() tabsdata=', this.tabsdata);
    // },
    methods: {
        onClickTab(tab) {
            console.log('TabComponent onClickTab() tab = ', tab);
            // this.$emit('@click', tab);
            this.$emit('@change', tab);
        }
    }
}