# 打包优化

本文主要介绍一些优化 Webpack 配置的方法，目的是让打包的速度更快，输出的资源更小。本文将会包含以下内容：

- 多线程打包与 happyPack。

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
