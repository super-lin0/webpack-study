# 开发环境调优

Webpack 作为打包工具的重要使命之一就是提升效率。本文我们将介绍一些对日常开发有一定帮助的 Webpack 插件及调试方法。本文内容包括：

- Webpack 周边插件介绍

- 模块热替换及其原理

## Webpack 开发效率插件

Webpack 拥有非常强大的生态系统，社区中相关的工具也是数不胜数。这里我们介绍几个使用比较广泛的 Webpack 插件，可以从不同的方面对 Webpack 的能力进行增强。

### webpack-dashboard

Webpack 每一次构建结束后都会在控制台输出一些打包相关的信息日志，但是这些日志是以列表形式呈现的，有时会显得不够直观。Webpack-dashboard 则是以更好的方式来展示这些信息的。先来看一下最终效果。

![](https://raw.githubusercontent.com/super-lin0/pic/master/img/20191003105248.png)

**安装**

```
yarn add webpack-dashboard --dev

```

**webpack 配置**

```
// webpack.config.js
const DashboardPlugin = require("webpack-dashboard/plugin");

module.exports = {
  context: path.join(__dirname, "./src"),
  entry: {
    app: "./index.js",
    util: "./util.js"
  },
  output: {
    filename: "[name].js",
    publicPath: "./dist/"
  },
  plugins: [
    new htmlPlugin({
      title: path.basename(__dirname)
    }),
    new DashboardPlugin()
  ],
};

```

**修改启动方式**

```
  //package.json
  "scripts": {
    "build": "webpack",
    "start": "webpack-dashboard -- webpack-dev-server --open-page \"./index.html\""
  },
```

**完整示例**

<a href="https://github.com/super-lin0/webpack-study/tree/master/webpackinaction/09-best-pratice-for-dev/webpack-dashboard" >webpack-dashboard</a>

### webpack-merge

顾名思义，我们猜测这个插件是用来合并 Webpack 配置的。先来看看用法

```
// webpack.common.config.js
const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    publicPath: "/dist/"
  },
  mode: "development",
  devServer: {
    port: 3000,
    publicPath: "/dist/"
  },
  plugins: [new HtmlPlugin({ title: path.basename(__dirname) })],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: "file-loader"
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};

```

```
// webpack.prod.config.js

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

```

是具体使用过程当中，我们会发现它在合并 module.rules 的过程中会以 test 属性作为标识符，当发现有相同项出现的时候会以后面的规则覆盖前面的规则。

**完整示例**

<a href="https://github.com/super-lin0/webpack-study/tree/master/webpackinaction/09-best-pratice-for-dev/webpack-merge" >webpack-merge</a>
