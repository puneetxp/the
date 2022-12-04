import { useUserStore } from "/src/Store/Model/User.js";

const link = "/api/user"
function all() {
    fetch("/api/user").then(
        (response) => response.json()
    ).then((i) => { useUserStore().upsertItem(i) });
}
function create(user) {
    fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    }).then(
        (response) => response.json()
    ).then((i) => { useUserStore().addItem(i) })
}
function upsert(users) {
    fetch("/api/user/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(users)
    }).then(
        (response) => response.json()
    ).then((i) => { useUserStore().upsertItem(i) })
}
function update(user) {
    fetch("/api/user/" + user.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    }).then(
        (response) => response.json()
    ).then((i) => { useUserStore().upsertItem([i]) })
}
function del(id) {
    fetch("/api/user/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    }).then(
        (response) => response.json()
    ).then((i) => { useUserStore().removeItem(id) })
}
export default { all, create, update, del, upsert };