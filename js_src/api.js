import Promise from "bluebird";

const API_VERSION = "v1";
const API_ADDRESS = "http://localhost:3000/api/";

const url = API_ADDRESS + API_VERSION;

export default {
  songs (song) {

    if (song && song.constructor === Array) {
      return {
        chartPositions(between) {
          if (between && between.constructor === Array && between.length === 2) {
            var req = url + 
          } else {
            var req = url +
          }
        }
      }
    } else {
      return new Promise(function(resolve, reject) {

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url + "/songs");
        xhr.onload = function() {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(xhr.status);
          }
        };
        xhr.send();

      });
    }
  },
}
