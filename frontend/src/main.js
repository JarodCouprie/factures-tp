import "./assets/main.scss";

import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import axiosPlugin from "@/plugins/axios.js";

const app = createApp(App);
const pinia = createPinia();

app.use(axiosPlugin);
pinia.use(({ store }) => {
  store.$http = app.config.globalProperties.$http;
});
app.use(pinia);
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
