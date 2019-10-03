const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");

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
  plugins: [new HtmlPlugin({ title: path.basename(__dirname) })]
};
