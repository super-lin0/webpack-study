const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    publicPath: "/dist/"
  },
  mode: "development",
  devServer: {
    port: 3000,
    publicPath: "/dist/"
  },
  plugins: [new HtmlPlugin({ title: path.basename(__dirname) })],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: "file-loader"
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
