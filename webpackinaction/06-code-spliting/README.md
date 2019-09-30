# 代码分片(Code Splitting)

- Webpack 提供了三种方式来进行代码分片

  - 入口配置：entry 入口使用多个入口文件；

  - 抽取公有代码：使用 SplitChunks 抽取公有代码；

  - 动态加载 ：动态加载一些代码。

## 通过入口划分代码

- 在 Webpack 中每个入口都将生成一个对应的资源文件，通过入口的配置我们可以进行一些简单有效的代码拆分

- 对于 Web 应用来说通常会有一些库和工具是不常变动的，可以把他们放在一个单独的入口中，由该入口产生的资源不会经常更新，可以有效利用客户端缓存，让用户不必在每次请求页面时都重新加载。

```
  entry: {
    app: "./app.js",
    lib: ["lib-a", "lib-b", "lib-c"]
  }
```

## SplitChunks(抽取公有代码)

- 可以将多个 Chunk 中公共的部分提取出来

```
  // SplitChunks默认配置
  module.exports = {
    //...
    optimization: {
      splitChunks: {
        chunks: 'async',  // 表示从哪些chunks里面抽取代码，除了三个可选字符串值 initial（只对入口chunk生效）、async(只提取异步chunk)、all(两种模式同时开启) 之外，还可以通过函数来过滤所需的 chunks；
        minSize: 30000, // 表示抽取出来的文件在压缩前的最小大小，默认为 30000；
        maxSize: 0, // 表示抽取出来的文件在压缩前的最大大小，默认为 0，表示不限制最大大小；
        minChunks: 1, // 表示被引用次数，默认为1；
        maxAsyncRequests: 5,  // 最大的按需(异步)加载次数，默认为 5；
        maxInitialRequests: 3,  // 最大的初始化加载次数，默认为 3；
        automaticNameDelimiter: '~',  // 抽取出来的文件的自动生成名字的分割符，默认为 ~；
        name: true, // 抽取出来文件的名字，默认为 true，表示自动生成文件名；
        cacheGroups: {  // 分离chunks时的规则
          vendors: {  //  用于提取node_modules中符合条件的模块
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {  // 作用于被多次引用的模块
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    }
  };
```

### SplitChunks 默认情况下的提取条件

- 提取后的 chunk 可被共享或者来自 node_modules 目录

- 提取后的 JavaScript Chunk 体积大于 30KB，CSS Chunk 体积大于 50KB。

- 在按需加载过程中，并行请求的资源最大值小于等于 5

- 在首次加载时，并行请求的自愿书最大值小于等于 3

## 资源异步加载（按需加载）

- 当模块数量过多、资源体积过大时，可以把一些暂时使用不到的模块延迟加载。

### import()

- 同 ES6 中的 import 语法不同，通过 import 函数加载的模块及其依赖会被异步地进行加载，并返回一个 Promise 对象。
