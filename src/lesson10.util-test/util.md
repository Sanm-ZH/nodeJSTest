### Node.js 常用工具
util 是一个Node.js 核心模块，提供常用函数的集合，用于弥补核心JavaScript 的功能 过于精简的不足。

---
#### util.inherits
`util.inherits(constructor, superConstructor)`是一个实现对象间原型继承 的函数。

JavaScript 的面向对象特性是基于原型的，与常见的基于类的不同。JavaScript 没有 提供对象继承的语言级别特性，而是通过原型复制来实现的。

在这里我们只介绍util.inherits 的用法，示例如下：
```js
// util-inherits.js

const util = require('util');

function Base() {
  this.name = 'base';
  this.base = 2019;
  this.sayHello = () => {
    console.log('hello ' + this.name);
  }
};

Base.prototype.showName = function() {
  console.log(this.name);
};

function Sub() {
  this.name = 'sub'
};

util.inherits(Sub, Base);

const objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);

const objSub = new Sub();
objSub.showName();
// objSub.sayHello();
console.log(objSub);
```
我们定义了一个基础对象Base 和一个继承自Base 的Sub，Base 有三个在构造函数 内定义的属性和一个原型中定义的函数，通过util.inherits 实现继承。运行结果如下：
```js
$ node util-inherits.js
base
hello base
Base { name: 'base', base: 2019, sayHello: [Function] }
sub
Sub { name: 'sub' }
```
意：Sub 仅仅继承了Base 在原型中定义的函数，而构造函数内部创造的 base 属 性和 sayHello 函数都没有被 Sub 继承。

同时，在原型中定义的属性不会被console.log 作 为对象的属性输出。如果我们去掉 objSub.sayHello(); 这行的注释，将会看到：
```js
$ node util-inherits.js
base
hello base
Base { name: 'base', base: 2019, sayHello: [Function] }
sub
/Users/sanm/vscodeProjects/nodeJSTest/src/lesson10.util-test/util-inherits.js:28
objSub.sayHello();
       ^

TypeError: objSub.sayHello is not a function
    at Object.<anonymous> (/Users/sanm/vscodeProjects/nodeJSTest/src/lesson10.util-test/util-inherits.js:28:8)
    at Module._compile (internal/modules/cjs/loader.js:688:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:699:10)
    at Module.load (internal/modules/cjs/loader.js:598:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:537:12)
    at Function.Module._load (internal/modules/cjs/loader.js:529:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:741:12)
    at startup (internal/bootstrap/node.js:285:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:739:3)
```
---
#### util.inspect
`util.inspect(object,[showHidden],[depth],[colors])`是一个将任意对象转换 为字符串的方法，通常用于调试和错误输出。它至少接受一个参数 object，即要转换的对象。

showHidden 是一个可选参数，如果值为 true，将会输出更多隐藏信息。

depth 表示最大递归的层数，如果对象很复杂，你可以指定层数以控制输出信息的多 少。如果不指定depth，默认会递归2层，指定为 null 表示将不限递归层数完整遍历对象。 如果color 值为 true，输出格式将会以ANSI 颜色编码，通常用于在终端显示更漂亮 的效果。

特别要指出的是，util.inspect 并不会简单地直接把对象转换为字符串，即使该对 象定义了toString 方法也不会调用。
```js
// util-inspect.js

const util = require('util');

function Person() {
  this.name = 'byvoid';
  this.toString = function(){
    return this.name;
  }
};

const obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj, true, null, true));
```
运行结果是：
```
Person { name: 'byvoid', toString: [Function] }
Person {
  name: 'byvoid',
  toString:
   { [Function]
     [length]: 0,
     [name]: '',
     [arguments]: null,
     [caller]: null,
     [prototype]: { [constructor]: [Circular] } } }
```
---
#### util.isArray(object)
如果给定的参数 "object" 是一个数组返回true，否则返回false。
```js
// util-isArray.js

const util = require('util');

util.isArray([]); // true
util.isArray(new Array()); // true
util.isArray({}); // false
```
---
#### util.isRegExp(object)
如果给定的参数 "object" 是一个正则表达式返回true，否则返回false。
```js
const util = require('util');

util.isRegExp(/some regexp/); // true
util.isRegExp(new RegExp('another regexp')); // true
util.isRegExp({}); // false
```
---
#### util.isDate(object)
如果给定的参数 "object" 是一个日期返回true，否则返回false。
```js
const util = require('util');

util.isDate(new Date()); // true
util.isDate(Date()); // false (without 'new' returns a String)
util.isDate({}); // false
```
---
#### util.isError(object)
如果给定的参数 "object" 是一个错误对象返回true，否则返回false。
```js
const util = require('util');

util.isError(new Error()); // true
util.isError(new TypeError()); // true
util.isError({ name: 'Error', message: 'an error occurred' }); // false
```
> 更多详情可以访问 [http://nodejs.org/api/util.html](http://nodejs.org/api/util.html) 了解详细内容。

