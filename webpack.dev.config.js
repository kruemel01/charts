var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: [
    "webpack/hot/dev-server",
    "webpack-hot-middleware/client",
    "./js_src/main.js"
  ],
  output: {
    path: "/",
    publicPath: "http://localhost:3000/assets",
    filename: "build.js"
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
