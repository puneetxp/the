let vuest = false;
document.querySelectorAll('.vue').forEach(i => i.addEventListener('click',
 async (event) => {
  event.preventDefault();
  const vue = await import("/cdn/js/vue.js");
  const pinia = await import("/cdn/js/pinia.js");
  const login = await import("/src/Service/Login.js");
  const route = await import("/src/router.js");
  login.loginstatusService();
  route.default.push(new URL(event.target.href).pathname);
  await vue.createApp({}).use(route.default).use(pinia.createPinia()).mount("#app");
  event.target.classList.remove('vue');
  document.querySelectorAll('.vue').forEach(i => i.classList.remove('vue'));
  if (vuest == false) {
   vuest = true;
  }
 }))