var express = require("express");
var mysql = require("node-mysql");
//dev
var webpack = require("webpack");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var config = require("./webpack.dev.config");
var compiler = webpack(config);

var app = express();

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true }
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log
}));

app.use("/static", express.static("static"));

app.get("*", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function() {
  console.log("Running on 3000");
});
