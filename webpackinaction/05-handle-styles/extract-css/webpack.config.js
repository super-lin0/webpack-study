const path = require("path");
const htmlPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader", // 插件无法提取样式时所采用的loader
          use: "css-loader" // 在提取样式之前采用哪些loader来预先进行处理
        })
      }
    ]
  },
  mode: "development",
  plugins: [
    // 接收一个插件数组
    new htmlPlugin({ title: path.basename(__dirname) }),
    new ExtractTextPlugin("style.css") // 提取后的资源文件名
  ],
  devServer: {
    publicPath: "/dist/",
    port: 3000
  }
};
