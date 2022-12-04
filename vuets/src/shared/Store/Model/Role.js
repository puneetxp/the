import { defineStore, acceptHMRUpdate } from "/cdn/js/pinia.js";
export const useRoleStore = defineStore({
    id: "Role",
    state: () => ({
        rawItems: [],
    }),
    getters: {
        items: (state) => state.rawItems
    },
    actions: {
        addItem(role) {
            this.rawItems.push(role)
        },
        removeItem(id) {
            this.rawItems = this.rawItems.filter(i => i.id != id);
        },
        editItem(role) {
            this.rawItems = this.rawItems.filter(i => i.id != role.id);
            this.rawItems.push(role);
        },
        upsertItem(roles) {
            roles.forEach(role => {
                this.rawItems = this.rawItems.filter(i => i.id != role.id);
                this.rawItems.push(role);
            });
        }
    },
})
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useRoleStore, import.meta.hot))
}
    