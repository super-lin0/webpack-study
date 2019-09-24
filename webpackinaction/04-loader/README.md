# 预处理器

- loader 就像 Webpack 的翻译官。Webpack 本身只能接受 JavaScript，为了使其能够处理其他类型的资源，必须使用 loader 将资源转译为 Webpack 能够理解的形式

- 在配置 loader 时，实际上定义的是模块规则（module.rules）,它主要关注两件事情： 该规则对哪些模块生效(test、exclude、include 配置)，使用哪些 loader(use 配置)。loader 可以是链式的，并且每一个都允许拥有自己的配置项。

- loader 本质上是一个函数。第一个 loader 的输入是源文件，之后所有的 loader 的输入是上一个 loader 的输出，最后一个 loader 则直接输出给 webpack。
