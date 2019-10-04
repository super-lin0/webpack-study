const path = require("path");
const htmlPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  context: path.join(__dirname, "./src"),
  entry: {
    app: "./index.js"
    // util: "./util.js"
  },
  output: {
    filename: "bundle.js",
    publicPath: "/dist/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { modules: false }]]
          }
        }
      }
    ]
  },
  plugins: [
    new htmlPlugin({
      title: path.basename(__dirname)
    })
  ],
  mode: "production",
  devServer: {
    publicPath: "/dist/",
    port: 3000
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        exclude: /\/excludes/
      })
    ]
  }
};
