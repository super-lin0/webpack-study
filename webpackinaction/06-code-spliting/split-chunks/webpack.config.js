const path = require("path");
const htmlPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  context: path.join(__dirname, "./src"),
  entry: {
    foo: "./foo.js",
    bar: "./bar.js"
  },
  output: {
    filename: "[name].js"
  },
  optimization: {
    splitChunks: {
      chunks: "all", // SplitChunks将会对所有的chunks生效（默认情况下，只对异步chunks生效）
      name: "common"
    }
  },
  mode: "development",
  plugins: [new htmlPlugin({ title: path.basename(__dirname) })],
  devServer: {
    publicPath: "/dist/",
    port: 3000
  }
};
