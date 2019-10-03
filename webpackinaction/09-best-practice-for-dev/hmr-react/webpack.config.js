const path = require("path");
const htmlPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    filename: "[name].js",
    publicPath: "./dist/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["react"],
          plugins: ["react-hot-loader/babel"]
        }
      }
    ]
  },
  mode: "development",
  plugins: [
    new htmlPlugin({
      title: path.basename(__dirname)
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    publicPath: "/dist/",
    port: 3000
  }
};
