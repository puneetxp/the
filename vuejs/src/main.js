let vuest = false;
dqa('.vuehref').forEach(i => i.addEventListener('click',
  async (event) => {
    event.preventDefault();
    history.pushState({}, '', event.target.href);
    const script = document.createElement('script');
    script.setAttribute('src', '/src/app.js');
    script.setAttribute('type', 'module');
    document.body.appendChild(script);
    event.target.classList.remove('vuehref');
    dqa('.vuehref').forEach(i => i.classList.remove('vuehref'));
    bootstrap;
    if (vuest == false) {
      vuest = true;
    }
  }));

function bootstrap() {
  let bootstrap = false;

  dqa('.bootstrap').forEach(i => i.addEventListener('click',
    async (event) => {
      event.target.classList.remove('bootstrap')
      await import('https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js');
      dqa('.bootstrap').forEach(i => i.classList.remove('bootstrap'));
      if (bootstrap == false) {
        event.target.click();
        bootstrap = true;
      }
    }))
}
window.onload = bootstrap;
function dqa(query) {
  return document.querySelectorAll(query);
}
function dq(query) {
  return document.querySelector(query);
}