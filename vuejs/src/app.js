import { createApp } from "/cdn/js/vue.js";
import { createPinia } from "/cdn/js/pinia.js";
import { loginstatusService } from "/src/Service/Login.js";
import { dq } from "/src/the.js";
loginstatusService();
import router from "/src/router.js";
createApp().use(router).use(createPinia()).mount("#app");
dq('.server_end').innerHTML = '';