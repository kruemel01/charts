import Vue from "vue";

import store from "./store";
import { initState } from "./actions";

import App from "./App.vue";
import Selector from "./Selector.vue";
import Details from "./Details.vue";
import Chart from "./Chart.vue";
import SongSelector from "./SongSelector.vue";

Vue.component("app", App);
Vue.component("details", Details);
Vue.component("selector", Selector);
Vue.component("chart", Chart);
Vue.component("song-selector", SongSelector);

var vm = new Vue({
  el: "#vue-container",
  store,
  init() {
    initState(store);
  }
});
