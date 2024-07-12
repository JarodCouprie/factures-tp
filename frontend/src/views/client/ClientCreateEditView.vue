<template>
  <div>
    <div class="client" v-if="!loading && client">
      <div class="row border-bottom pb-3 mb-3">
        <div class="col">
          <h1 v-if="isNewClient" class="h3">
            <i class="fa-solid fa-angle-down me-2"/>Créer un client
          </h1>
          <h1 v-else class="h3">
            <i class="fa-solid fa-angle-down me-2"/>Éditer un client
          </h1>
        </div>
        <div class="col text-end">
          <button v-if="!isNewClient" @click="onDeleteClient(client)" class="btn btn-outline-danger me-2">
            <i class="fa-solid fa-trash me-2"/>
            Supprimer le client
          </button>
          <button @click="onGoBack()" class="btn btn-outline-primary">
            <i class="fa-solid fa-arrow-left me-2"/>
            Retour
          </button>
        </div>
      </div>

      <div class="alert alert-danger my-3" v-if="error">
        Un champ requière votre attention
      </div>

      <div class="row">
        <div class="col-md-4">
          <div class="form-floating mb-3">
            <input
                type="text"
                name="firstName"
                id="firstName"
                v-model="client.firstName"
                class="form-control"
                placeholder="Prénom"
                :class="{ 'is-invalid': !client.firstName }"
            />
            <label for="firstName" class="form-label">Prénom</label>
          </div>
          <div class="form-floating mb-3">
            <input
                type="text"
                name="function"
                id="function"
                v-model="client.function"
                class="form-control"
                placeholder="Directeur"
                :class="{ 'is-invalid': !client.function }"
            />
            <label for="function" class="form-label">Fonction</label>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-floating mb-3">
            <input
                type="text"
                name="lastName"
                id="lastName"
                v-model="client.lastName"
                class="form-control"
                placeholder="Nom"
                :class="{ 'is-invalid': !client.lastName }"
            />
            <label for="lastName" class="form-label">Nom</label>
          </div>
          <div class="form-floating mb-3">
            <input
                type="text"
                name="phone"
                id="phone"
                v-model="client.phone"
                class="form-control"
                placeholder="03 87 45 20 13"
                :class="{ 'is-invalid': !client.phone }"
            />
            <label for="phone" class="form-label">Téléphone</label>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-floating mb-3">
            <input
                type="date"
                name="date"
                id="date"
                class="form-control"
                placeholder="Date"
                format="yyyy-MM-dd"
                v-model="client.date"
                :class="{ 'is-invalid': !client.date }"
            />
            <label for="date" class="form-label">Créé le</label>
          </div>
        </div>
        <div class="col-md-8">
          <div class="form-floating mb-3">
            <input
                type="text"
                name="email"
                id="email"
                v-model="client.email"
                class="form-control"
                placeholder="email@gmail.com"
                :class="{ 'is-invalid': !client.email }"
            />
            <label for="email" class="form-label">Email</label>
          </div>
          <div class="form-floating mb-3">
            <input
                type="text"
                name="companyName"
                id="companyName"
                v-model="client.companyName"
                class="form-control"
                placeholder="SFR"
                :class="{ 'is-invalid': !client.companyName }"
            />
            <label for="companyName" class="form-label">Entreprise</label>
          </div>
        </div>
        <h4 class="py-4">Coordonnées</h4>
        <div class="col-md-8">
          <div class="form-floating mb-3">
            <input
                type="text"
                name="firstAddress"
                id="firstAddress"
                v-model="client.firstAddress"
                class="form-control"
                placeholder="4 Rue des Roses"
                :class="{ 'is-invalid': !client.firstAddress }"
            />
            <label for="firstAddress" class="form-label">Adresse 1</label>
          </div>
          <div class="form-floating mb-3">
            <input
                type="text"
                name="secondAddress"
                id="secondAddress"
                v-model="client.secondAddress"
                class="form-control"
                placeholder="appartement 604"
                :class="{ 'is-invalid': !client.secondAddress }"
            />
            <label for="secondAddress" class="form-label">Adresse 2</label>
          </div>
        </div>
        <div class="col-md-4"></div>
        <div class="col-md-4">
          <div class="form-floating mb-3">
            <input
                type="text"
                name="postCode"
                id="postCode"
                v-model="client.postCode"
                class="form-control"
                placeholder="64 100"
                :class="{ 'is-invalid': !client.postCode }"
            />
            <label for="postCode" class="form-label">Code Postal</label>
          </div>
          <div class="form-floating mb-3">
            <input
                type="text"
                name="country"
                id="country"
                v-model="client.country"
                class="form-control"
                placeholder="FRANCE"
                :class="{ 'is-invalid': !client.country }"
            />
            <label for="country" class="form-label">Pays</label>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-floating mb-3">
            <input
                type="text"
                name="city"
                id="city"
                v-model="client.city"
                class="form-control"
                placeholder="Bayonne"
                :class="{ 'is-invalid': !client.city }"
            />
            <label for="city" class="form-label">Ville</label>
          </div>
        </div>
      </div>
      <div class="text-end">
        <button
            @click="onSave()"
            :disabled="formInvalid"
            class="btn btn-outline-primary btn-lg px-5"
        >
          <i class="fa-solid fa-save me-2"/>Enregistrer
        </button>
      </div>
      <AppDebug :datas="client"/>
    </div>
    <div v-else>
      Aucune données
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "pinia";
import {useClientStore} from "@/stores/client.js";

export default {
  props: {
    id: {
      type: String,
      default: "new",
    },
  },
  data() {
    return {
      error: false
    }
  },
  beforeMount() {
    this.setClient(this.id);
  },
  computed: {
    ...mapState(useClientStore, {
      client: 'item',
      loading: 'loading'
    }),
    isNewClient() {
      return this.id === "new"
    },
    formInvalid() {
      return (
          !this.client ||
          !this.client.firstName ||
          !this.client.lastName ||
          !this.client.companyName ||
          !this.client.date ||
          !this.client.function ||
          !this.client.email ||
          !this.client.phone ||
          !this.client.firstAddress ||
          !this.client.postCode ||
          !this.client.city ||
          !this.client.country
      );
    },
  },
  methods: {
    ...mapActions(useClientStore, {
      setClient: "setItem",
      updateClient: "updateItem",
      createClient: "createItem",
      deleteClient: "deleteItem",
    }),

    onGoBack() {
      this.$router.push({name: "clients"});
    },

    onDeleteClient() {
      this.deleteClient(this.id);
      this.$router.push({name: "clients"});
    },

    onSave() {
      if (this.formInvalid) {
        this.error = true;
      } else {
        this.error = false;
        if (this.isNewClient) {
          this.createClient(this.client);
        } else {
          this.updateClient(this.client);
        }
        this.$router.push({name: "clients"});
      }
    },

  }
}
</script>