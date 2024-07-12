<template>
  <div class="home">
    <div class="d-flex justify-content-between">
      <h1 class="h3">
        <i class="fa-solid fa-angle-down me-2"/>Dashboard
      </h1>
      <div class="d-flex gap-2">
        <button
            @click="$router.push({ name: 'create-bill' })"
            class="btn btn-outline-primary"
        >
          <i class="fa-solid fa-plus-circle me-2"/>
          Ajouter une facture
        </button>
        <button
            @click="$router.push({ name: 'create-client' })"
            class="btn btn-outline-primary"
        >
          <i class="fa-solid fa-plus-circle me-2"/>
          Ajouter un client
        </button>
      </div>
    </div>
  </div>
  <pre>
    {{ items }}
  </pre>
</template>

<script>

import {mapActions, mapState} from "pinia";
import {useDashboardStore} from "@/stores/dashboard.js";

export default {
  computed: {
    ...mapState(useDashboardStore, {
      items: "items",
      loading: "loading",
    }),
  },
  async created() {
    this.$watch(() => this.$route.params.id, this.getItems, {immediate: true})
  },
  methods: {
    ...mapActions(useDashboardStore, {
      getItems: "getItems",
    }),
  },
};
</script>
