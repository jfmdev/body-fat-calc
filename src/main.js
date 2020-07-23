import Vue from "vue";

import App from "./App.vue";
import store from "./store";

import "./registerServiceWorker";

Vue.config.productionTip = false;

// Font Awesome.
require("../node_modules/@fortawesome/fontawesome-free/css/all.min.css");

// Bootstrap.
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// Bootstrap Vue.
import BootstrapVue from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

// Custom styles.
require("./styles.css");

// Local storage.
import VueLocalStorage from "vue-localstorage";
Vue.use(VueLocalStorage);

// Directives.
import "./utils/directives";

// Define application.
new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
