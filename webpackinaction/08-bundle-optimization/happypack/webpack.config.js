const path = require("path");
const htmlPlugin = require("html-webpack-plugin");
const HappyPack = require("happypack");

const babelQuery = {
  presets: [
    [
      "env",
      {
        modules: false,
        targets: {
          browsers: ["> 1%", "last 3 versions"]
        }
      }
    ],
    "react"
  ]
};

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
        loader: "happypack/loader"
      }
    ]
  },
  plugins: [
    new htmlPlugin({
      title: path.basename(__dirname)
    }),
    new HappyPack({
      loaders: [
        {
          loader: "babel-loader",
          options: babelQuery
        }
      ]
    })
  ],
  mode: "development",
  devServer: {
    publicPath: "/dist/",
    port: 3000
  }
};
