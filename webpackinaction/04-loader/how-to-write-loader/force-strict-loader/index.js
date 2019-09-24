var loaderUtils = require("loader-utils");
var SourceNode = require("source-map").SourceNode;
var SourceMapConsumer = require("source-map").SourceMapConsumer;

module.exports = function(content, sourceMap) {
  var useStrictPrefix = "'use strict';\n\n";

  // 使用缓存
  if (this.chcheable) {
    this.chcheable();
  }
  // 获取和打印 options
  var options = loaderUtils.getOptions(this) || {};
  console.log("options::::", options);

  if (options.sourceMap && sourceMap) {
    var currentRequest = loaderUtils.getCurrentRequest(this);
    var node = SourceNode.fromStringWithSourceMap(
      content,
      new SourceMapConsumer(sourceMap)
    );

    node.prepend(useStrictPrefix);
    var result = node.toStringWithSourceMap({ file: currentRequest });
    var callback = this.async();
    callback(null, result.code, result.map.toJSON());
  }

  // 不支持source-map的情况
  return useStrictPrefix + content;
};
