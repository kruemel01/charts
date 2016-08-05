var fs = require("fs");
var cheerio = require("cheerio");
var request = require("request");
var db = require("node-mysql");
var mysql = require("mysql");
var q = require("q");

var charts = mysql.createPool({
  connectionLimit: 50,
  host: "localhost",
  user: "root",
  password: "",
  database: "charts"
});

function scrape(url, time) {
  console.log("Scraping " + url + time);
  var promises = [];
  request({
      url: url + time,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36"
      }
    }, function(err, res, html) {
    if (!err && res.statusCode == 200) {

      var $ = cheerio.load(html);

      var songs = [];

      $(".chart-row__title").each(function(i) {
        var song = [
          time,
          $(this)
          .children(".chart-row__song")
          .text().replace(/\s+/g, " ")
          .trim(),
          $(this)
          .children(".chart-row__artist")
          .text().replace(/\s+/g, " ")
          .trim(),
          i + 1
        ];
        songs.push(song);

      });

      charts.getConnection(function (err, conn) {
        if (err) throw err;
        var query = conn.query("INSERT INTO albums (time,name,interpret,position) VALUES ? ON DUPLICATE KEY UPDATE time=VALUES(time)",
        [songs],
        function(err, res) {
          if (err) {
            console.log("QUERY ERROR: ");
            throw err;
          }
          current++;
          console.log("INSERTED " + time + " (" + current + "/" + total + ")");
          conn.release();
        });
      });
    }
  });
}

function scrapeDates(url, _dates) {
  while (_dates.length) {
    scrape(url, _dates.shift());
  }
}

function getDatesArray(year, month, yearend, monthend) {
  var date = new Date(year, month-1, 1);
  var result = [];
  while (date.getMonth() <= monthend-1 && date.getFullYear() <= yearend ) {
    if (date.getDay() === 6) {
      result.push(date.getFullYear() + "-" + ("0" + (date.getMonth()+1)).slice(-2) + "-" + ("0" + (date.getDate())).slice(-2));
    }
    date.setDate(date.getDate()+1);
  }
  return result;
}

const dates = getDatesArray(process.argv[2], process.argv[3], process.argv[4], process.argv[5]);
const total = dates.length;
var current = 0;
const URL = "http://www.billboard.com/charts/billboard-200/";

scrapeDates(URL, dates);
