import loginState from "/src/Store/Login.js"
export default {
    template: `<div></div>`,
    mounted() {
        fetch('/api/logout').then(i => {
            loginState.update(false);
            this.$router.push('/');
        });

    },
}