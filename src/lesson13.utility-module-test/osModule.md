**[工具模块](/src/lesson13.utility-module-test/utilityModule.md)**
### Node.js OS 模块

Node.js os 模块提供了一些基本的系统操作函数。通过以下方式引入该模块：
```js
const os = require("os")
```
##### 方法
序号|	方法 & 描述
:---|:---
1|	**os.tmpdir()**<br>返回操作系统的默认临时文件夹。
2|	**os.endianness()**<br>返回 CPU 的字节序，可能的是 "BE" 或 "LE"。
3|	**os.hostname()**<br>返回操作系统的主机名。
4|	**os.type()**<br>返回操作系统名
5|	**os.platform()**<br>返回编译时的操作系统名
6|	**os.arch()**<br>返回操作系统 CPU 架构，可能的值有 "x64"、"arm" 和 "ia32"。
7|	**os.release()**<br>返回操作系统的发行版本。
8|	**os.uptime()**<br>返回操作系统运行的时间，以秒为单位。
9|	**os.loadavg()**<br>返回一个包含 1、5、15 分钟平均负载的数组。
10|	**os.totalmem()**<br>返回系统内存总量，单位为字节。
11|	**os.freemem()**<br>返回操作系统空闲内存量，单位是字节。
12|	**os.cpus()**<br>返回一个对象数组，包含所安装的每个 CPU/内核的信息：型号、速度（单位 MHz）、时间（一个包含 user、nice、sys、idle 和 irq 所使用 CPU/内核毫秒数的对象）。
13|	**os.networkInterfaces()**<br>获得网络接口列表。
##### 属性
序号|	属性 & 描述
:---|:---
1|	**os.EOL**<br>定义了操作系统的行尾符的常量。

##### 实例
代码如下所示：
```js
// os-test.js

const os = require('os')

// CPU字节序
console.log(`endianness: ${os.endianness()}`)

// 操作系统名
console.log(`type: ${os.type()}`)

// cpu加购
console.log(`arch: ${os.arch()}`)

// 编译时返回操作系统名
console.log(`platform: ${os.platform}`)

// 操作系统发行版本
console.log(`release: ${os.release}`)

// 系统运行时间
console.log(`uptime: ${os.uptime()}`)

// 系统内存总量
console.log(`totalmem: ${os.totalmem()} bytes`)

// 系统空闲内存
console.log(`freemem: ${os.freemem()} bytes`)
```
执行结果：
```
$ node os-test.js
endianness: LE
type: Windows_NT
arch: x64
platform: win32
release: 10.0.15063
uptime: 451575
totalmem: 17062428672 bytes
freemem: 9184591872 bytes
```
---
**[工具模块](/src/lesson13.utility-module-test/utilityModule.md)**