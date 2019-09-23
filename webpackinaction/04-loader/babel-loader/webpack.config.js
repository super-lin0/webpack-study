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
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: [
              [
                "@babel/preset-env",
                {
                  modules: false,
                  targets: {
                    browsers: [
                      "> 1%",
                      "last 3 versions",
                      "ios 8",
                      "android 4.2",
                      "ie 9"
                    ]
                  },
                  useBuiltIns: "usage"
                }
              ]
            ]
          }
        }
      }
    ]
  },
  devServer: {
    publicPath: "/dist/",
    port: 3000
  }
};
