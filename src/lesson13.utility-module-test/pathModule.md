**[工具模块](/src/lesson13.utility-module-test/utilityModule.md)**
### Node.js Path 模块

Node.js path 模块提供了一些用于处理文件路径的小工具，可以通过以下方式引入该模块：
```js
const path = require("path")
```
##### 方法
序号|	方法 & 描述
:---|:---
1|	**path.normalize(p)**<br>规范化路径，注意'..' 和 '.'。
2|	**path.join([path1][, path2][, ...])**<br>用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是"/"，Windows系统是"\"。
3|	**path.resolve([from ...], to)**<br>将 to 参数解析为绝对路径，给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径。 例如，给定的路径片段的序列为：/foo、/bar、baz，则调用 path.resolve('/foo', '/bar', 'baz') 会返回 /bar/baz。
4|	**path.isAbsolute(path)**<br>判断参数 path 是否是绝对路径。
5|	**path.relative(from, to)**<br>用于将绝对路径转为相对路径，返回从 from 到 to 的相对路径（基于当前工作目录）。
6|	**path.dirname(p)**<br>返回路径中代表文件夹的部分，同 Unix 的dirname 命令类似。
7|	**path.basename(p[, ext])**<br>返回路径中的最后一部分。同 Unix 命令 bashname 类似。
8|	**path.extname(p)**<br>返回路径中文件的后缀名，即路径中最后一个'.'之后的部分。如果一个路径中并不包含'.'或该路径只包含一个'.' 且这个'.'为路径的第一个字符，则此命令返回空字符串。
9|	**path.parse(pathString)**<br>返回路径字符串的对象。
10|	**path.format(pathObject)**<br>从对象中返回路径字符串，和 path.parse 相反。
##### 属性
序号|	属性 & 描述
:---|:---
1|	**path.sep**<br>平台的文件路径分隔符，'\\' 或 '/'。
2|	**path.delimiter**<br>平台的分隔符, ; or ':'.
3|	**path.posix**<br>提供上述 path 的方法，不过总是以 posix 兼容的方式交互。
4|	**path.win32**<br>提供上述 path 的方法，不过总是以 win32 兼容的方式交互。
##### 实例
代码如下所示：
```js
// path-test.js

const path = require('path')

// 格式化路径
console.log('normalization : ' + path.normalize('/test/test1//2slashes/1slash/tab/..'));

// 连接路径
console.log('joint path : ' + path.join('/test', 'test1', '2slashes/1slash', 'tab', '..'));

// 转换为绝对路径
console.log('resolve : ' + path.resolve('path-test.js'));

// 路径中文件的后缀名
console.log('ext name : ' + path.extname('path-test.js'));
```
执行结果：
```
$ node path-test.js
normalization : \test\test1\2slashes\1slash
joint path : \test\test1\2slashes\1slash
resolve : E:\vscodeProject\nodeJSTest\src\lesson13.utility-module-test\path-test.js
ext name : .js

```
---
**[工具模块](/src/lesson13.utility-module-test/utilityModule.md)**