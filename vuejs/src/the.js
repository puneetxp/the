export const dq = (query) => {
    return document.querySelectorAll(query);
}
export const FormFetch = (event) => {
    const formData = new FormData();
    if (event.target instanceof HTMLFormElement) {
        const T = event.target;
        T.querySelectorAll('input').forEach(element => {
            formData.append(element.name, element.value);
        });
        return fetch(T.action, {
            method: T.method, body: formData
        });
    }
}