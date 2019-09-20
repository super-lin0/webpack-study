# 模块打包

## ES6 Module

### 模块

- 将每个文件作为一个模块，每个模块拥有自身的作用域
- ES6 Module自动采用严格模式
- 模块依赖关系的建立发生在代码编译阶段
- 在导入一个模块时，ES6 Module中是值的动态映射，并且这个映射是只读的

### 导出

- 命名导出
```
  // 第一种
  export const name = "";
  export const add = () => {};

  // 第二种
  export {name, add}

  // 别名
  export {add as getSum}
```

- 默认导出

```
  export default {name: "", add: () => {}}
```

### 导入

```
  // 命名导出
  export {name, add};

  // 导入的变量都是只读的
  import {name, add} from "xxx.js";

  import {name, add as cacluteSum} from "xxx.js";

  import * as caclutor from "xxx.js";

  // 默认导出
  export default {name: "", add: () => {}}

  import myCaclutor from "xxx.js";

  // 混合导入
  import React, {Component} from "react";
```

### 复合写法

```
export {name, add} from "xxx.js";
```