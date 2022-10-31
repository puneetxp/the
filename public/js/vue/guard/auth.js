import loginState from "/js/vue/Store/Login.js"
function auth() {
    if (loginState.login) {
        return true;
    } else {
        return { path: '/login' }
    }
}
function notauth() {
    if (loginState.login == false) {
        return true;
    } else {
        return { path: '/' }
    }
}
export { auth, notauth }