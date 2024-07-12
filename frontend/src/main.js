import "./assets/main.scss";

import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// enregistrement de composants globaux
import AppDebug from "@/components/AppDebug.vue";
app.component(
  // nom à utiliser dans le template
  "AppDebug",
  // le composant à utiliser
  AppDebug,
);

app.mount("#app");
