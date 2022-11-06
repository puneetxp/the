import { createApp } from "/cdn/js/vue.js";
import { createPinia } from "/js/vue/pinia.js";
import { loginstatusService } from "/js/vue/Service/Login.js";
loginstatusService();
import router from "/js/vue/router.js";
createApp().use(router).use(createPinia()).mount("#app");