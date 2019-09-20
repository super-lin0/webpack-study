const htmlPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  context: path.join(__dirname, "./src"),
  entry: () => ({
    app: './index.js',
    detail: "./components/detail",
    list: "./components/list",
  }),
  output: {
    filename: "[name].js"
  },
  mode: "development",
  plugins: [new htmlPlugin({ title: path.basename(__dirname) })],
  devServer: {
    publicPath: "/dist/",
    port: 3000
  }
}