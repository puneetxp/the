import { useRoleStore } from "/src/Store/Model/Role.js";

const link = "/api/role"
function all() {
    fetch("/api/role").then(
        (response) => response.json()
    ).then((i) => { useRoleStore().upsertItem(i) });
}
function create(role) {
    fetch("/api/role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(role)
    }).then(
        (response) => response.json()
    ).then((i) => { useRoleStore().addItem(i) })
}
function upsert(roles) {
    fetch("/api/role/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roles)
    }).then(
        (response) => response.json()
    ).then((i) => { useRoleStore().upsertItem(i) })
}
function update(role) {
    fetch("/api/role/" + role.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(role)
    }).then(
        (response) => response.json()
    ).then((i) => { useRoleStore().upsertItem([i]) })
}
function del(id) {
    fetch("/api/role/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    }).then(
        (response) => response.json()
    ).then((i) => { useRoleStore().removeItem(id) })
}
export default { all, create, update, del, upsert };