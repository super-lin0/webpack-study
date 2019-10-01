const webpack = require("webpack");
const htmlPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js"
  },
  mode: "production",
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify("production"),
      IS_PROD: true,
      ENV_ID: 130912098,
      CONSTANTS: {
        TYPES: JSON.stringify(["foo", "bar"])
      }
    }),
    new htmlPlugin({ title: path.basename(__dirname) })
  ],
  devServer: {
    publicPath: "/dist/",
    port: 3000
  }
};
