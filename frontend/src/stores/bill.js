import { billInterface } from "@/interfaces/bill";
import { bills } from "@/seeds/bills";
import { defineStore } from "pinia";

// si je veux interragir avec un autre store, il suffit de l'importer
import { useCounterStore } from "./counter";

export const useBillStore = defineStore("bill", {
  state: () => ({
    items: bills, //la liste des factures utilisées dans BillsView
    item: null, //formulaire d'édition utilisé dans CreateEditBillView
    loading: false, // un simple boolean pour indiquer le chargement des données
  }),
  getters: {},
  actions: {
    // plus tard, on chargera la liste des facture depuis une base de donnée
    // getList() {
    //   return this.bills
    // }

    // récupère la facture correspondant à l'id dans le store des bills et enregistre le résultat dans le store de la facture bill
    setItem(id) {
      this.loading = true;
      // exemple d'intégration d'un autre store dans une fonction :
      const counterStore = useCounterStore();

      // on peut ensuite faire référence aux fonctions, state, et getters de ce store :
      counterStore.increment();
      console.log("counter incrémenté", counterStore.count);

      // ici je fais la différence entre la création d'une nouvelle facture
      // et l'édition d'une facture existante
      if (id === "new") {
        // si c'est une nouvelle facture, j'utilise un objet tout neuf de mon interface d'objet pour une facture
        this.item = { ...billInterface };
      } else {
        // sinon, j'utilise les données de la facture existante dans la liste des factures
        this.item = this.items.find((item) => item.id == id);
      }

      this.loading = false;
    },

    // mise à jour d'une facture
    updateItem(form) {
      this.loading = true;
      // ici on recherche l'index de la facture à modifier dans la liste des factures
      const index = this.items.findIndex((item) => item.id == form.id);
      // on remplace la facture à modifier par la nouvelle facture qui est passée en paramètre de la fonction
      console.log(this.items[index], form);
      this.items[index] = { ...form };
      // puis on vidange le formulaire d'édition
      // this.item = null
      this.loading = false;
    },
    // création d'une nouvelle facture
    createItem(form) {
      // ici, j'envoie simplement le formulaire dans le tableau des factures pour créer une nouvelle facture
      this.items.push(form);
      // je vidange le formulaire d'édition
      // this.item = null
    },

    // suppression d'une facture
    deleteItem(id) {
      this.loading = true;
      // filtre le tableau en enlevant la facture qui a l'id recherché
      this.items = this.items.filter((item) => item.id != id);
      // vidange du formulaire d'édition
      // this.item = null
      this.loading = false;
    },
  },
});
