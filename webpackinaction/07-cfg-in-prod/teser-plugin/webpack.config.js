const htmlPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js"
  },
  mode: "production",
  plugins: [new htmlPlugin({ title: path.basename(__dirname) })],
  devServer: {
    publicPath: "/dist/",
    port: 3000
  },
  optimization: {
    // 覆盖默认的 minimizer
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        exclude: /\/excludes/
      })
    ]
  }
};
