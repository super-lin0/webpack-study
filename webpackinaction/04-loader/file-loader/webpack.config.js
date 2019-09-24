const htmlPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  context: path.join(__dirname, "./src"),
  entry: "./index.js",
  output: {
    filename: "bundle.js"
  },
  mode: "development",
  plugins: [new htmlPlugin({ title: path.basename(__dirname) })],
  module: {
    rules: [
      {
        test: /\.(JPG|jpg|png|gif)$/,
        exclude: /node_modules/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            publicPath: "./assets-path/"
          }
        }
      }
    ]
  },
  devServer: {
    publicPath: "/dist/",
    port: 3000
  }
};
