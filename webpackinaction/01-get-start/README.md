- npm --save-dev 为本地安装（npm install webpack webpack-cli --save-dev）
  安装指令中的 --save-dev 参数是将 包作为工程的 devDependencies（开发环境依赖） 记录在 package.json 中。仅在本地开发时才会用到，在生产环境中并不需要。

- 本地安装后，工程内部只能使用 npx webpack <command> 的形式

- 打包命令 npx webpack --entry=./index.js --output-filename=bundle.js --mode=development

- scripts 是 npm 提供的脚本命令功能

- webpack 默认目录： 源码入口： src/index.js; 输出资源： /dist

- webpack 默认配置文件 webpack.config.js ， package.json中配置： "build": "webpack"

- webpack-dev-server 为本地开发工具，服务启动时，会先让将打包结果放在内存中，并不会写入实际的bundle.js.

- webpack-dev-server 自动刷新功能： live-reloading。无须配置，已经实现
