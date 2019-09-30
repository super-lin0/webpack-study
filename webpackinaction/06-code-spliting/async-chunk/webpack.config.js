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
    filename: "[name].js",
    publicPath: "/dist/",
    chunkFilename: "[name].js" // 指定异步chunk的文件名
  },
  mode: "development",
  plugins: [new htmlPlugin({ title: path.basename(__dirname) })],
  devServer: {
    publicPath: "/dist/",
    port: 3000
  }
};
