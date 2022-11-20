import { defineStore, acceptHMRUpdate } from "/js/vue/pinia.js";
export const useUserStore = defineStore({
    id: "User",
    state: () => ({
        rawItems: [],
    }),
    getters: {
        items: (state) => state.rawItems
    },
    actions: {
        addItem(user) {
            this.rawItems.push(user)
        },
        removeItem(id) {
            this.rawItems = this.rawItems.filter(i => i.id != id);
        },
        editItem(user) {
            this.rawItems = this.rawItems.filter(i => i.id != user.id);
            this.rawItems.push(user);
        },
        upsertItem(users) {
            users.forEach(user => {
                this.rawItems = this.rawItems.filter(i => i.id != user.id);
                this.rawItems.push(user);
            });
        }
    },
})
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
    