import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import 'bootstrap/dist/css/bootstrap.min.css'
import store from "./assets/store/store.js"
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
axios.baseURL= "http://localhost:8080";
Vue.config.productionTip = false;

new Vue({
  store,
  router, // inject the router to make whole app router-aware
  render: h => h(App)
}).$mount("#app");
