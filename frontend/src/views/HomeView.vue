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
    <div class="row">
      <div class="col-md-3 card">
        <h5><span class="fs-2">{{ items.billsNumber }}</span> Factures en 2024</h5>
        <div>
          <Doughnut :data="chartData" :options="chartOptions"/>
          <div class="d-flex justify-content-end pt-2 align-items-center">
            <p class="fw-bold m-0">{{ formattedPrice }}</p>
          </div>
          <div class="d-flex flex-column gap-1">
            <p class="m-0">
              <i class="fa-regular fa-circle" :style="{ color : '#3d63d5'}"/>
              Total Encaissée TTC
            </p>
            <p class="m-0">
              <i class="fa-regular fa-circle" :style="{ color : '#f6e434'}"/>
              Total Facturé TTC
            </p>
            <p class="m-0">
              <i class="fa-regular fa-circle" :style="{ color : '#e36471'}"/>
              Dû à plus d'un mois TTC
            </p>
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

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  components: {
    Doughnut
  },
  data() {
    return {
      chartData: {
        labels: ['Total Encaissée TTC', 'Total Facturé TTC', "Dû à plus d'un mois TTC"],
        datasets: [
          {
            backgroundColor: ['#3d63d5', '#f6e434', '#e36471'],
            data: [58.6, 34.9, 6.5]
          },
        ]
      },
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
