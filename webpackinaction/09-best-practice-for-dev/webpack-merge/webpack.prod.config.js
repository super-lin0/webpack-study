const merge = require("webpack-merge");
const commonCfg = require("./webpack.common.config");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge.smart(commonCfg, {
  mode: "production",
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
  }
});
