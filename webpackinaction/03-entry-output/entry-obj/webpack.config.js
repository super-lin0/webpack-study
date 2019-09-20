const htmlPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: './src/index.js',
    detail: "./src/components/detail",
    list: "./src/components/list",

  },
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