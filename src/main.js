import { createApp } from "vue";
import App from "./App.vue";
import { authRef } from "./firebase/config";
import router from "./router";

let app;

authRef.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(router).mount("#app");
  }
});
