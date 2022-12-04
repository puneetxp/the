import { defineStore, acceptHMRUpdate } from "/cdn/js/pinia.js";
export const useActive_roleStore = defineStore({
    id: "Active_role",
    state: () => ({
        rawItems: [],
    }),
    getters: {
        items: (state) => state.rawItems
    },
    actions: {
        addItem(active_role) {
            this.rawItems.push(active_role)
        },
        removeItem(id) {
            this.rawItems = this.rawItems.filter(i => i.id != id);
        },
        editItem(active_role) {
            this.rawItems = this.rawItems.filter(i => i.id != active_role.id);
            this.rawItems.push(active_role);
        },
        upsertItem(active_roles) {
            active_roles.forEach(active_role => {
                this.rawItems = this.rawItems.filter(i => i.id != active_role.id);
                this.rawItems.push(active_role);
            });
        }
    },
})
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useActive_roleStore, import.meta.hot))
}
    