import {clientInterface} from "@/interfaces/client.js";
import {defineStore} from "pinia";

export const useClientStore = defineStore("client", {
    state: () => ({
        items: {},
        item: null,
        loading: false,
    }),
    getters: {},
    actions: {
        async getItems() {
            this.loading = true;
            try {
                const response = await this.$http.get("/clients");
                this.items = response.data;
            } catch (e) {
                console.error(e)
            }
            this.loading = false;
        },

        async setItem(id) {
            try {
                if (id === "new") {
                    this.item = {...clientInterface};
                } else {
                    const response = await this.$http.get(`/clients/${id}`);
                    this.item = response.data;
                }
            } catch (e) {
                console.error(e)
            }
        },

        async updateItem(form) {
            this.loading = true;
            try {
                const response = await this.$http.patch(`/clients/${form.id}`, form);
                this.item = {...response.data}
            } catch (e) {
                console.error(e)
            }
            this.loading = false;
        },
        async createItem(form) {
            try {
                await this.$http.post(`/clients`, form)
            } catch (e) {
                console.error(e)
            }
        },

        async deleteItem(id) {
            this.loading = true;
            try {
                await this.$http.delete(`/clients/${id}`);
                await this.getItems();
            } catch (e) {
                console.error(e)
            }
            this.loading = false;
        },
    },
});
