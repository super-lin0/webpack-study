const path = require("path");
const htmlPlugin = require("html-webpack-plugin");

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
          presets: ["react"]
        }
      }
    ]
  },
  mode: "development",
  plugins: [
    new htmlPlugin({
      title: path.basename(__dirname)
    })
  ],
  devServer: {
    hot: true,
    publicPath: "/dist/",
    port: 3000
  }
};
