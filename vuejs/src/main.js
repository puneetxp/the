let vuest = false;
document.querySelectorAll('.vue').forEach(i => i.addEventListener('click',
 async (event) => {
  event.preventDefault();
  const vue = await import("/cdn/js/vue.js");
  const pinia = await import("/cdn/js/pinia.js");
  const login = await import("/src/Service/Login.js");
  const route = await import("/src/router.js");
  bootstrap();
  console.log(route);
  login.loginstatusService();
  event.target.classList.remove('vue');
  vue.createApp({}).use(route.router).use(pinia.createPinia()).mount("#app");
  route.default.push(event.target.href);
  document.querySelectorAll('.vue').forEach(i => i.classList.remove('vue'));
  if (vuest == false) {
   vuest = true;
  }
 }))

function bootstrap() {
 let bootstrap = false;

 document.querySelectorAll('.bootstrap').forEach(i => i.addEventListener('click',
  async (event) => {
   event.target.classList.remove('bootstrap')
   await import('https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js');
   document.querySelectorAll('.bootstrap').forEach(i => i.classList.remove('bootstrap'));
   if (bootstrap == false) {
    event.target.click();
    bootstrap = true;
   }
  }))
}
window.onload = bootstrap;