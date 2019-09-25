const path = require("path");
const htmlPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          "style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
          {
            loader: "css-loader",
            options: { sourceMap: true }
          },
          { loader: "postcss-loader", options: { sourceMap: true } }
        ]
      }
    ]
  },
  mode: "development",
  plugins: [
    new htmlPlugin({ title: path.basename(__dirname) }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  devServer: {
    publicPath: "/dist/",
    port: 3000
  }
};
