const path = require("path");
const htmlPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].js"
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        // 生效范围，只压缩匹配到的资源
        assetNameRegExp: /\.css$/g,
        cssProcessor: require("cssnano"), // 压缩处理器，默认为cssnano
        cssProcessorOptions: {
          // 压缩处理器的配置
          discardComments: { removeAll: true }
        },
        canPrint: true // 是否展示log
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  mode: "production",
  plugins: [
    new htmlPlugin({ title: path.basename(__dirname) }),
    new ExtractTextPlugin("style.css")
  ],
  devServer: {
    publicPath: "/dist/",
    port: 3000
  }
};
