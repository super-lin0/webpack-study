const path = require("path");
const webpack = require("webpack");

const dllAssetPath = path.join(__dirname, "dll");
const dllLibraryName = "dllExample";

module.exports = {
  entry: ["react"], // 把哪些模块打包为vendor
  output: {
    path: dllAssetPath,
    filename: "vendor.js",
    library: dllLibraryName
  },
  plugins: [
    new webpack.DllPlugin({
      name: dllLibraryName, // 导出dll library的名字，需要与output.library值相对应
      path: path.join(dllAssetPath, "manifest.json") // 资源清单的绝对路径，业务代码打包时会使用这个清单进行模块索引
    }),
    new webpack.HashedModuleIdsPlugin()
  ]
};
