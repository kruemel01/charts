import api from "./api";

export const selectSong = function ({dispatch}, song) {
  dispatch("SELECT_SONG", song);
}

export const initState = function ({dispatch}) {
  api.songs()
  .then(songs => {
    dispatch("SET_SONGS", songs);
  });
}
