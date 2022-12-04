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