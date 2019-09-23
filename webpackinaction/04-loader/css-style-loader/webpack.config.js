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
        test: /\.css$/, // 匹配所有以.css结尾的文件
        use: ["style-loader", "css-loader"], // 接收一个数组，该数组包含该规则所使用的loader，按照从后往前的顺序将资源交给loader处理
        exclude: /node_modules/ // 所有被正则表达式匹配到的模块都排除在规则之外
      }
    ]
  },
  devServer: {
    publicPath: "/dist/",
    port: 3000
  }
};
