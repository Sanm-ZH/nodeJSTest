### Node.js EventEmitter

Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列。

Node.js 里面的许多对象都会分发事件：一个 net.Server 对象会在每次有新连接时触发一个事件， 一个 fs.readStream 对象会在文件被打开的时候触发一个事件。 所有这些产生事件的对象都是 events.EventEmitter 的实例。

---

#### EventEmitter 类

events 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就是事件触发与事件监听器功能的封装。

你可以通过 require("events");来访问该模块。

```js
// 引入 events 模块
const events = require('events')
// 创建 eventEmitter 对象
const eventEmitter = new events.EventEmitter()
```

EventEmitter 对象如果在实例化时发生错误，会触发 error 事件。当添加新的监听器时，newListener 事件会触发，当监听器被移除时，removeListener 事件被触发。

下面我们用一个简单的例子说明 EventEmitter 的用法：

```js
//event-1.js 文件
const EventEmitter = require('events').EventEmitter
const event = new EventEmitter()
event.on('test_1', function() {
	console.log('test_1 事件触发')
})
setTimeout(function() {
	event.emit('test_1')
}, 1000)
```

执行结果如下：

```console
$ node event-1.js
test_1 事件触发
```

运行这段代码，1 秒后控制台输出了 'test_1 事件触发'。其原理是 event 对象注册了事件 test_1 的一个监听器，然后我们通过 setTimeout 在 1000 毫秒以后向 event 对象发送事件 test_1，此时会调用 test_1 的监听器。

EventEmitter 的每个事件由一个事件名和若干个参数组成，事件名是一个字符串，通常表达一定的语义。对于每个事件，EventEmitter 支持 若干个事件监听器。

当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。

让我们以下面的例子解释这个过程：

```js
//event-2.js 文件
const eventEmitter = require('events').EventEmitter
const event = new eventEmitter()

event.on('someEvent', (arg1, arg2) => {
  console.log('listener1', arg1, arg2)
})
event.on('someEvent', (arg1, arg2) => {
  console.log('listener2', arg1, arg2)
})

event.emit('someEvent', 'arg1 参数', 'arg2 参数')
```

```console
$ node event-2.js
listener1 arg1 参数 arg2 参数
listener2 arg1 参数 arg2 参数
```

以上例子中，emitter 为事件 someEvent 注册了两个事件监听器，然后触发了 someEvent 事件。

运行结果中可以看到两个事件监听器回调函数被先后调用。 这就是 EventEmitter 最简单的用法。

EventEmitter 提供了多个属性，如 on 和 emit。on 函数用于绑定事件函数，emit 属性用于触发一个事件。接下来我们来具体看下 EventEmitter 的属性介绍。

#### 方法

| 序号 | 方法 & 描述                                                                                                                                                         |
| :--- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | **addListener(event, listener)** <br> 为指定事件添加一个监听器到监听器数组的尾部。                                                                                  |
| 2    | **on(event, listener)** <br> 为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。                                                                        |
| 3    | **once(event, listener)** <br> 为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器                                                      |
| 4    | **removeListener(event, listener)**<br>移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。<br>它接受两个参数，第一个是事件名称，第二个是回调函数名称。 |
| 5    | **removeAllListeners([event])**<br>移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。                                                            |
| 6    | **setMaxListeners(n)**<br>默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。 setMaxListeners 函数用于提高监听器的默认限制的数量。            |
| 7    | **listeners(event)**<br>返回指定事件的监听器数组。                                                                                                                  |
| 8    | **emit(event, [arg1], [arg2], [...])**<br>按参数的顺序执行每个监听器，如果事件有注册监听返回 true，否则返回 false。                                                 |

#### 类方法
| 序号 | 方法 & 描述                                                      |
| :--- | :--------------------------------------------------------------- |
| 1    | **listenerCount(emitter, event)** <br>返回指定事件的监听器数量。 |
```js
events.EventEmitter.listenerCount(emitter, eventName) //已废弃，不推荐
events.emitter.listenerCount(eventName) //推荐
```

#### 事件
| 序号 | 事件 & 描述                                                                                                                                                                                   |
| :--- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | **newListener**<br> **① event** - 字符串，事件名称 <br> **② listener** - 处理事件函数<br>该事件在添加新监听器时被触发。                                                                       |
| 2    | **removeListener**<br>**① event** - 字符串，事件名称<br>**② listener** - 处理事件函数<br>从指定监听器数组中删除一个监听器。需要注意的是，此操作将会改变处于被删监听器之后的那些监听器的索引。 |

#### 实例
以下实例通过 connection（连接）事件演示了 EventEmitter 类的应用。

创建 main.js 文件，代码如下：
```js
// main.js
const events = require('events');
const eventEmitter = new events.EventEmitter();

// 监听器 #1
const listener1 = () => {
   console.log('监听器 listener1 执行。');
}

// 监听器 #2
const listener2 = () => {
  console.log('监听器 listener2 执行。');
}

// 绑定 connection 事件，处理函数为 listener1 
eventEmitter.addListener('connection', listener1);

// 绑定 connection 事件，处理函数为 listener2
eventEmitter.on('connection', listener2);

let eventListeners = eventEmitter.listenerCount('connection');
console.log(eventListeners + " 个监听器监听连接事件。");

// 处理 connection 事件 
eventEmitter.emit('connection');

// 移除监绑定的 listener1 函数
eventEmitter.removeListener('connection', listener1);
console.log("listener1 不再受监听。");

// 触发连接事件
eventEmitter.emit('connection');

eventListeners = eventEmitter.listenerCount('connection');
console.log(eventListeners + " 个监听器监听连接事件。");

console.log("程序执行完毕。");
```
以上代码，执行结果如下所示：
```console
$ node main.js
2 个监听器监听连接事件。
监听器 listener1 执行。
监听器 listener2 执行。
listener1 不再受监听。
监听器 listener2 执行。
1 个监听器监听连接事件。
程序执行完毕。
```
#### error 事件
EventEmitter 定义了一个特殊的事件 error，它包含了错误的语义，我们在遇到 异常的时候通常会触发 error 事件。

当 error 被触发时，EventEmitter 规定如果没有响 应的监听器，Node.js 会把它当作异常，退出程序并输出错误信息。

我们一般要为会触发 error 事件的对象设置监听器，避免遇到错误后整个程序崩溃。例如：
```js
// error.js
const events = require('events');
const emitter = new events.EventEmitter();
emitter.emit('error');
```
运行时会显示以下错误：
```console
events.js:173
    throw err; // Unhandled 'error' event
    ^

Error [ERR_UNHANDLED_ERROR]: Unhandled error.
    at EventEmitter.emit (events.js:171:17)
    at Object.<anonymous> (/Users/sanm/vscodeProjects/nodeJSTest/src/lesson03.eventEmitter-test/error.js:3:9)
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

### 继承 EventEmitter
大多数时候我们不会直接使用 EventEmitter，而是在对象中继承它。包括 fs、net、 http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类。

为什么要这样做呢？原因有两点：

首先，具有某个实体功能的对象实现事件符合语义， 事件的监听和发生应该是一个对象的方法。

其次 JavaScript 的对象机制是基于原型的，支持 部分多重继承，继承 EventEmitter 不会打乱对象原有的继承关系。
