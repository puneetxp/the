import { useActive_roleStore } from "/js/vue/Store/Model/Active_role.js";

const link = "/api/active_role"
function all() {
    fetch("/api/active_role").then(
        (response) => response.json()
    ).then((i) => { useActive_roleStore().upsertItem(i) });
}
function create(active_role) {
    fetch("/api/active_role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(active_role)
    }).then(
        (response) => response.json()
    ).then((i) => { useActive_roleStore().addItem(i) })
}
function upsert(active_roles) {
    fetch("/api/active_role/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(active_roles)
    }).then(
        (response) => response.json()
    ).then((i) => { useActive_roleStore().upsertItem(i) })
}
function update(active_role) {
    fetch("/api/active_role/" + active_role.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(active_role)
    }).then(
        (response) => response.json()
    ).then((i) => { useActive_roleStore().upsertItem([i]) })
}
function del(id) {
    fetch("/api/active_role/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    }).then(
        (response) => response.json()
    ).then((i) => { useActive_roleStore().removeItem(id) })
}
export default { all, create, update, del, upsert };