import { reactive } from '/cdn/js/vue.js';
let loginstate = localStorage.getItem('login') || false;
export default reactive({
    login: loginstate,
    update(login) {
        this.login = login;
        localStorage.setItem('login', login);
    }
})