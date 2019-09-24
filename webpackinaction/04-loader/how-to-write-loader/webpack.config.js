const path = require("path");
const htmlPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].js"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: path.join(__dirname, "./force-strict-loader"),
          options: {
            sourceMap: true
          }
        }
      }
    ]
  },
  devtool: "source-map",
  plugins: [new htmlPlugin({ title: path.join(__dirname) })],
  devServer: {
    publicPath: "/dist/",
    port: 3000
  }
};
