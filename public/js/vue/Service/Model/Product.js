import { useProductStore } from "/js/vue/Store/Model/Product.js";

const link = "/api/product"
function all() {
    fetch("/api/product").then(
        (response) => response.json()
    ).then((i) => { useProductStore().upsertItem(i) });
}
function create(product) {
    fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    }).then(
        (response) => response.json()
    ).then((i) => { useProductStore().addItem(i) })
}
function upsert(products) {
    fetch("/api/product/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(products)
    }).then(
        (response) => response.json()
    ).then((i) => { useProductStore().upsertItem(i) })
}
function update(product) {
    fetch("/api/product/" + product.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    }).then(
        (response) => response.json()
    ).then((i) => { useProductStore().upsertItem([i]) })
}
function del(id) {
    fetch("/api/product/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    }).then(
        (response) => response.json()
    ).then((i) => { useProductStore().removeItem(id) })
}
export default { all, create, update, del, upsert };