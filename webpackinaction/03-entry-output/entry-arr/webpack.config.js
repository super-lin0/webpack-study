const htmlPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    filename: "bundle.js"
  },
  mode: "development",
  plugins: [new htmlPlugin({ title: path.basename(__dirname) })],
  devServer: {
    publicPath: "/dist/",
    port: 3000
  }
}