const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const SizePlugin = require("size-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    publicPath: "/dist/"
  },
  mode: "development",
  devServer: {
    port: 3000,
    publicPath: "/dist/"
  },
  plugins: [
    new HtmlPlugin({ title: path.basename(__dirname) }),
    new SizePlugin()
  ]
};
