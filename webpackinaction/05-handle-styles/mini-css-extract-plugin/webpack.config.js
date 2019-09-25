const path = require("path");
const htmlPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: path.join(__dirname, "./src"),
  entry: "./app.js",
  output: {
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
          "css-loader"
        ]
      }
    ]
  },
  mode: "development",
  plugins: [
    // 接收一个插件数组
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
