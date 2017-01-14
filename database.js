var Promise = require("bluebird");
var mysql = require("mysql");
var AppError = require("./error.js");

var pool = Promise.promisifyAll(mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "",
  database: "charts"
}));

function getAllSongPositions(songs) {
  var promises = [];
  songs.forEach(function(song) {
    promises.push(getSongPositions(song));
  });
  return Promise.all(promises);
}

function getSongPositions(song) {
  if (song.name && song.interpret) {
    return pool.queryAsync(
      "SELECT time, position FROM top100 WHERE name=? AND interpret=? ORDER BY time",
      [song.name, song.interpret]
    ).then(function(positions) {
      return new Promise(function(resolve, reject) {
        if (positions.length) {
          var result = {
            song: {
              name: song.name,
              interpret: song.interpret
            },
            positions
          }
          resolve(result);
        } else {
          reject(new AppError(404, "Database returned no results for "
          + song.name + " and " + song.interpret));
        }

      });
    });
  } else {
    return Promise.reject(new AppError(400, "Song object does not contain name and interpret."));
  }
}

function getAllSongPositionsBetween(params) {
  var promises = [];
  params.songs.forEach(function(song) {
    promises.push(getSongPositionsBetween(song, params.timespan));
  });
  return Promise.all(promises);
}

function getSongPositionsBetween(song, timespan) {
  if (song.name && song.interpret) {
    return pool.queryAsync(
      "SELECT time, position FROM top100 WHERE name=? AND interpret=? AND time BETWEEN ? AND ? ORDER BY time",
      [song.name, song.interpret, timespan[0], timespan[1]]
    ).then(function(positions) {
      return new Promise(function(resolve, reject) {
        if (positions.length) {
          var result = {
            song: {
              name: song.name,
              interpret: song.interpret
            },
            positions
          }
          resolve(result);
        } else {
          reject(new AppError(404, "Database returned no results for "
          + song.name + " and " + song.interpret + " between " + timespan[0] + " and " + timespan[1]));
        }

      });
    });
  } else {
    return Promise.reject(new AppError(400, "Song object does not contain name and interpret."));
  }
}

module.exports = {
  connect() {
    return pool.getConnectionAsync();
  },

  getSongChartPositions(req) {
    return function(conn) {
      if (!(req.timespan.constructor === Array && req.timespan.length === 2)) {
        getAllSongPositions(conn, req.songs);
      } else  {
        getAllSongPositionsBetween(conn, req);
      }
    }
  }
};
