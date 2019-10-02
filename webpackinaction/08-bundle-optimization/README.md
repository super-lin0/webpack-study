# 打包优化

本文主要介绍一些优化 Webpack 配置的方法，目的是让打包的速度更快，输出的资源更小。本文将会包含以下内容：

- 多线程打包与 happyPack

- 缩小打包的作用域

- 动态链接库思想与 DLLPlugin

- 死代码检测与 tree shaking

## HappyPack

HappyPack 是一个通过多线程来提升 Webpack 打包速度的工具。

### 工作原理

在打包过程当中最耗时的工作就是使用 loader 将各种资源进行转译处理，最常见的包括使用 babel-loader 转译 ES6+ 语法，和 ts-loader 转译 TypeScript。转译的工作流程如下：

- 1、从配置中获取打包入口

- 2、匹配 loader 规则，并对入口模块进行转译

- 3、对转译后的模块进行依赖查找（如 a.js 中加载了 b.js 和 c.js）

- 4、对新找到的模块重复进行第 2、3 步骤，直到没有新的依赖模块。

由于运行在 Node.js 上的 Webpack 是单线程模型的，所以 Webpack 需要一步步地获取更深层级的资源，然后逐个进行串行转译，所以在模块多、依赖复杂的情况下，Webpack 构建速度将会变得很慢。HappyPack 恰好能解决此问题。

**核心特性**

可以开启多个线程，并行地对不同模块进行转译，这样就可以充分利用本地的计算资源来提升打包速度。

**适合场景**

HappyPack 适用于那些转译任务比较重的工程，例如 babel-loader、ts-loader，对于其他的如 sass-loader、less-loader 本身消耗时间并不太多的工程效果一般。

### 单个 loader 的优化

在实际使用过程中，要用 HappyPack 提供的 loader 来替换原有 loader，并将原有的那个 loader 通过 HappyPack 插件传进去。

**使用 HappyPack 之前**

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["react"]
        }
      }
    ]
  },
}
```

![](https://raw.githubusercontent.com/super-lin0/pic/master/img/20191002111803.png)

**使用 HappyPack**

```

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
};

```

![](https://raw.githubusercontent.com/super-lin0/pic/master/img/20191002112031.png)

由上面的结果可以大致发现，用 HappyPack 确实能够提升打包速度。

### 多个 loader 的优化

在使用 HappyLoader 优化多个 loader 时，需要为每一个 loader 配置一个 id，否则 HappyPack 无法知道 rules 与 plugins 如何一一对应。

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "happypack/loader?id=js"
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "happypack/loader?id=ts"
      }
    ]
  },
  plugins: [
    new htmlPlugin({
      title: path.basename(__dirname)
    }),
    new HappyPack({
      id: "js",
      loaders: [
        {
          loader: "babel-loader",
          options: {}
        }
      ]
    }),
    new HappyPack({
      id: "ts",
      loaders: [
        {
          loader: "ts-loader",
          options: {}
        }
      ]
    })
  ],
};

```

**完整示例**

<a href="https://github.com/super-lin0/webpack-study/tree/master/webpackinaction/08-bundle-optimization/happypack" >happyPack</a>

## 缩小打包作用域

从宏观角度来讲，提升性能的方法有两种：

- 增加资源

就是使用更多 CPU 和内存，用更多的计算能力来缩短执行任务的时间。例如上文提到的 HappyPack

- 缩小范围

针对任务本身，比如去掉冗余的流程，尽量不要作重复性的工作等。

### exclude 和 include

exclude 和 include 是用来排除或包含指定目录下的模块，可接收正则表达式或者字符串（文件绝对路径），以及由他们组成的数组。

```
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js"
  },
  mode: "development",
  plugins: [],
  module: {
    rules: [
      {
        test: /\.css$/, // 匹配所有以.css结尾的文件
        use: ["style-loader", "css-loader"], // 接收一个数组，该数组包含该规则所使用的loader，按照从后往前的顺序将资源交给loader处理
        exclude: /node_modules/, // 所有node_modules下的模块不应用这个规则
        include: /src/  // 只有src目录下的模块才会应用这个规则
      }
    ]
  },
}
```

**exclude**

所有被正则表达式所匹配到的模块都排除在该规则之外

**include**

该规则只针对被正则表达式匹配到的模块生效

**Note**

exclude 和 include 同时生效时，exclude 的优先级更高

### noParse

### IgnorePlugin

### Cache
