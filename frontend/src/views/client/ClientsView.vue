<template>
  <div class="clients">
    <div class="row border-bottom pb-3 mb-3">
      <div class="col">
        <h1 class="h3">
          <i class="fa-solid fa-angle-down me-2"/>Liste des clients
        </h1>
      </div>
      <div class="col text-end">
        <button
            @click="$router.push({ name: 'create-client' })"
            class="btn btn-outline-primary"
        >
          <i class="fa-solid fa-plus-circle me-2"/>
          Ajouter un client
        </button>
      </div>
    </div>

    <TableList v-if="!loading && clients">
      <template #thead>
        <th>Prénom</th>
        <th>Nom</th>
        <th>Entreprise</th>
        <th>Date d'ajout</th>
        <th class="text-end">Actions</th>
      </template>
      <ClientTableRow
          v-for="client in clients"
          :key="client.id"
          :client="client"
          @edit="$router.push({ name: 'edit-client', params: { id: $event.id } })"
          @delete="deleteClient($event.id)"
      />
    </TableList>

    <AppDebug :datas="clients"/>
  </div>
</template>

<script>
import ClientTableRow from "@/components/tables/ClientTableRow.vue";
import TableList from "@/components/tables/TableList.vue";
import {useClientStore} from "@/stores/client.js";
import {mapActions, mapState} from "pinia";

export default {
  components: {
    TableList,
    ClientTableRow,
  },
  computed: {
    ...mapState(useClientStore, {
      clients: "items",
      loading: "loading",
    }),
  },
  async created() {
    this.$watch(() => this.$route.params.id, this.getClients, {immediate: true})
  },
  methods: {
    ...mapActions(useClientStore, {
      deleteClient: "deleteItem",
      getClients: "getItems",
    }),
  },
};
</script>