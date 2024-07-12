import {defineStore} from "pinia";

export const useDashboardStore = defineStore("dashboard", {
    state: () => ({
        items: {
            bills: {},
            clients: {},
            billsNumber: 0,
            billsAmount: 0,
            totalBillPaid: 0,
            totalBillBilled: 0,
            totalBillPreviousYear: 0
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
