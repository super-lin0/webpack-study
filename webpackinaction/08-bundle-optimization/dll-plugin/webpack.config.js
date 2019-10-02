const path = require("path");
const htmlPlugin = require("html-webpack-plugin");
const Webpack = require("webpack");

module.exports = {
  context: path.join(__dirname, "./src"),
  entry: {
    app: "./index.js",
    util: "./util.js"
  },
  output: {
    filename: "[name].js",
    publicPath: "./dist/"
  },
  plugins: [
    new htmlPlugin({
      title: path.basename(__dirname)
    }),
    new Webpack.DllReferencePlugin({
      manifest: require(path.join(__dirname, "dll/manifest.json"))
    })
  ],
  mode: "development",
  devServer: {
    publicPath: "/dist/",
    port: 3000
  }
};
