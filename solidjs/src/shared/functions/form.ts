export const FormFetch = (event: Event) => {
 const formData = new FormData();
 event.preventDefault();
 if (event.target instanceof HTMLFormElement) {
  const T: HTMLFormElement = event.target;
  T.querySelectorAll('input').forEach(element => {
   formData.append(element.name, element.value);
  });
  return fetch(T.action, {
   method: T.method, body: formData
  });
 }
}
