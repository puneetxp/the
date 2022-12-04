import { defineStore, acceptHMRUpdate } from "/cdn/js/pinia.js";
export const useProductStore = defineStore({
    id: "Product",
    state: () => ({
        rawItems: [],
    }),
    getters: {
        items: (state) => state.rawItems
    },
    actions: {
        addItem(product) {
            this.rawItems.push(product)
        },
        removeItem(id) {
            this.rawItems = this.rawItems.filter(i => i.id != id);
        },
        editItem(product) {
            this.rawItems = this.rawItems.filter(i => i.id != product.id);
            this.rawItems.push(product);
        },
        upsertItem(products) {
            products.forEach(product => {
                this.rawItems = this.rawItems.filter(i => i.id != product.id);
                this.rawItems.push(product);
            });
        }
    },
})
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}
    