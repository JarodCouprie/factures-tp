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
    <div class="row py-4">
      <div class="col-md-4 card">
        <h5 class="pb-4"><span class="fs-2">{{ items.billsNumber }}</span> Factures en {{ new Date().getFullYear() }}
        </h5>
        <div>
          <Doughnut :data="{labels, datasets}" :options="chartOptions"/>
          <div class="d-flex justify-content-end py-4 align-items-center">
            <p class="fw-bold m-0">{{ formattedPrice }}</p>
          </div>
          <div class="d-flex flex-column gap-1">
            <div class="d-flex justify-content-between">
              <p class="m-0 d-flex gap-2 align-items-center">
                <i class="fa-regular fa-circle" :style="{ color : '#e36471'}"/>
                <span>Total Facturé TTC {{ new Date().getFullYear() - 1 }}</span>
                <span>{{ items.totalBillPreviousYear.toFixed(2) }} %</span>
              </p>
              <p class="m-0">
                -4%
                <i class="fa-solid fa-arrow-down text-danger"></i>
              </p>
            </div>
            <div class="d-flex justify-content-between">
              <p class="m-0 d-flex gap-2 align-items-center">
                <i class="fa-regular fa-circle" :style="{ color : '#f6e434'}"/>
                <span>Total Facturé TTC {{ new Date().getFullYear() }}</span>
                <span>{{ items.totalBillBilled.toFixed(2) }} %</span>
              </p>
              <p class="m-0">
                2%
                <i class="fa-solid fa-arrow-up text-success"></i>
              </p>
            </div>
            <div class="d-flex justify-content-between">
              <p class="m-0 d-flex gap-2 align-items-center">
                <i class="fa-regular fa-circle" :style="{ color : '#3d63d5'}"/>
                <span>Total Encaissée TTC</span>
                <span>{{ items.totalBillPaid.toFixed(2) }} %</span>
              </p>
              <p class="m-0">
                3%
                <i class="fa-solid fa-arrow-up text-success"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="px-4 d-flex flex-column gap-2">
          <div class="card p-4">
            <h5>
              Factures en cours
            </h5>
            <TableList v-if="!loading && items.bills">
              <template #thead>
                <th></th>
                <th>N°</th>
                <th>Client</th>
                <th class="text-end">Montant HT</th>
                <th class="text-end">Montant TTC</th>
                <th></th>
              </template>
              <BillTableRow
                  v-for="bill in items.bills"
                  :key="bill.id"
                  :bill="bill"
              >
                <template #bill-td>
                  <td><i class="fa-solid fa-receipt"></i></td>
                  <td>Facture {{ bill.billnum }}</td>
                  <td>{{ bill.client.firstName }} {{ bill.client.lastName }}</td>
                  <td class="text-end">{{ bill.totalHT.toFixed(2) }} €</td>
                  <td class="text-end">{{ bill.totalTTC.toFixed(2) }} €</td>
                  <td class="text-end fw-bold">
                    <span type="button"
                          @click="$router.push({ name: 'edit-bill', params: { id: bill.id } })">
                      éditer
                    </span>
                  </td>
                </template>
              </BillTableRow>
            </TableList>
          </div>
          <div class="card p-4">
            <h5>Clients</h5>
            <TableList v-if="!loading && items.bills">
              <template #thead>
                <th></th>
                <th>Nom du contact</th>
                <th>Entreprise</th>
                <th>Date d'ajout</th>
                <th></th>
              </template>
              <ClientTableRow
                  v-for="client in items.clients"
                  :key="client.id"
                  :client="client">
                <template #client-td>
                  <td><i class="fa-solid fa-user"></i></td>
                  <td>{{ client.firstName }} {{ client.lastName }}</td>
                  <td>{{ client.companyName }}</td>
                  <td>{{ client.date }}</td>
                  <td class="text-end fw-bold">
                    <span type="button"
                          @click="$router.push({ name: 'edit-client', params: { id: client.id } })">
                      éditer
                    </span>
                  </td>
                </template>
              </ClientTableRow>
            </TableList>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapActions, mapState} from "pinia";
import {useDashboardStore} from "@/stores/dashboard.js";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import {Doughnut} from 'vue-chartjs'
import TableList from "@/components/tables/TableList.vue";
import BillTableRow from "@/components/tables/BillTableRow.vue";
import ClientTableRow from "@/components/tables/ClientTableRow.vue";

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  components: {
    ClientTableRow,
    BillTableRow,
    TableList,
    Doughnut
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    }
  },
  computed: {
    ...mapState(useDashboardStore, {
      items: "items",
      loading: "loading",
    }),
    formattedPrice() {
      let Euro = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
      });
      return Euro.format(this.items.billsAmount);
    },
    labels() {
      return ["Total encaissé TTC", `Total Facturé TTC ${new Date().getFullYear()}`, `Total Facturé TTC ${new Date().getFullYear() - 1}`]
    },
    datasets() {
      return [
        {
          backgroundColor: ['#3d63d5', '#f6e434', '#e36471'],
          data: [this.items.totalBillPaid, this.items.totalBillBilled, this.items.totalBillPreviousYear]
        },
      ]
    }
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
