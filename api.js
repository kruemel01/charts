var express = require("express");
var db = require("./database");
var AppError = require("./error");
var raml2html = require("raml2html");
var bodyParser = require("body-parser");

var router = express.Router();
router.use(bodyParser.json());

Date.prototype.toJSON = function () {
  var yyyy = this.getFullYear();
  var mm = ("0" + (this.getMonth()+1)).slice(-2);
  var dd = ("0" + this.getDate()).slice(-2);
  return [yyyy,mm,dd].join("-");
};

function checkSongsArray({ body }) {
  if (body.songs && (
      body.songs.name &&
      body.songs.interpret &&
      typeof body.songs.name === "string" &&
      typeof body.songs.interpret === "string")) {

      return [
        body
      ];

  } else if (body.songs && body.songs.constructor === Array) {

      return body;

  } else {

    return new AppError(400, "Invalid request body.");

  }
}

router.get("/", function(req, res) {
  // TODO: Error handling
  raml2html.render("./api.raml", raml2html.getDefaultConfig())
  .then(function(result) {
    res.send(result);
  }, function(err) {
    res.send(err);
  });
});

router.post("/songs/chartPositions", function(req, res) {
  var params = checkSongsArray(req);

  if (!params.isAppError) {
    db.connect()
    .then(db.getSongChartPositions(params))
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      // TODO: Don't leak info in production
      err = err.isAppError ? err : new AppError();
      console.log(err);
      res.status(err.details.errno).json(err.details);
    });
  } else {
    res.status(params.details.errno).json(params.details);
  }
});

router.get("/songs", function(req, res) {
  // TODO: Error Handling, promises?
  pool.getConnection(function(err,conn) {
    conn.query("SELECT name, interpret FROM top100 GROUP BY name, interpret ORDER BY name", function(err, rows) {
      res.json(rows);
    });
  });
});

router.all("/*", function(req, res) {
  res.status(400).end();
});

module.exports = {
  router,
  version: "v1"
}
