import loginState from "/src/Store/Login.js";
function loginService(email, password) {
    
    fetch('/api/login', {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }).then((response) => response.json()).then(i => {
        loginState.update(i);
    }).catch(i => {
        loginState.update(false);
    })
}
function registerService(name, email, password) {
    fetch('/api/register', {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    }).then((response) => response.json()).then(i => {
        loginState.update(i);
    }).catch(i => {
        loginState.update(false);
    })
}
function logoutService() {
    fetch('/api/logout');
    loginState.update(false);
}
function loginstatusService() {
    fetch("/api/login").then((response) => response.json()).then(i => { loginState.login = i }).catch(i => { loginState.login = false });
}
export { loginService, registerService, loginstatusService, logoutService };
