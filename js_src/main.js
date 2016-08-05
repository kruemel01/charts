import Vue from "vue";
import App from "./App.vue";
import Selector from "./Selector.vue";
import Details from "./Details.vue";
import Chart from "./Chart.vue";

Vue.component("app", App);
Vue.component("chart", Chart);

var vm = new Vue({
  el: "#vue-container"
});
