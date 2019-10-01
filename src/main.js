import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";

Vue.config.productionTip = false;

// Font Awesome.
require("../node_modules/@fortawesome/fontawesome-free/css/all.min.css");

// Bootstrap.
import "bootstrap";
require("../node_modules/bootstrap/dist/css/bootstrap.min.css");

// Local storage.
import VueLocalStorage from "vue-localstorage";
Vue.use(VueLocalStorage);

// Define application.
new Vue({
  render: h => h(App)
}).$mount("#app");
