const path = require("path");
const htmlPlugin = require("html-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");

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
    new DashboardPlugin()
  ],
  mode: "production",
  devServer: {
    publicPath: "/dist/",
    port: 3000
  }
};
