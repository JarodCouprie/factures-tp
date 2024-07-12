import {defineStore} from "pinia";

export const useDashboardStore = defineStore("dashboard", {
    state: () => ({
        items: {
            clients: {},
            bills: {}
        },
        loading: false,
    }),
    getters: {},
    actions: {
        async getItems() {
            this.loading = true;
            try {
                const response = await this.$http.get("/dashboard");
                this.items = {...response.data};
            } catch (e) {
                console.error(e)
            }
            this.loading = false;
        },
    },
});
