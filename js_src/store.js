import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  selectedSong: null,
  songs: []
};

const mutations = {
  SELECT_SONG (state, song) {
    state.selectedSong = song;
  },
  SET_SONGS (state, songs) {
    state.songs = songs;
  }
};

export default new Vuex.Store({
  state,
  mutations
});
