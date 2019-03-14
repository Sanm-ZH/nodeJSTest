### Node.js Stream(流)

Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对 http 服务器发起请求的 request 对象就是一个 Stream，还有 stdout（标准输出）。

Node.js，Stream 有四种流类型：

- **Readable** - 可读操作。

- **Writable** - 可写操作。

- **Duplex** - 可读可写操作.

- **Transform** - 操作被写入数据，然后读出结果。

所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：

- **data** - 当有数据可读时触发。

- **end** - 没有更多的数据可读时触发。

- **error** - 在接收和写入过程中发生错误时触发。

- **finish** - 所有数据已被写入到底层系统时触发。

---

#### 从流中读取数据

创建 input.txt 文件，内容如下：

> 每天一个 helloworld，疾病远离我！

代码如下：

```js
// stream-read.js

const fs = require('fs')
let data = ''

// 创建可读流
const readerStream = fs.createReadStream('./input.txt')

// 设置编码为 utf-8
readerStream.setEncoding('UTF8')

// 处理流事件 --> data, end, and, error
readerStream.on('data', chunk => {
	data += chunk
})

readerStream.on('end', () => {
	console.log(data)
})

readerStream.on('error', err => {
	console.log(err.stack)
})

console.log('执行完毕')
```

执行结果如下：

```console
执行完毕
每天一个helloworld，疾病远离我！
```

---

#### 写入流

代码如下：

```js
// stream-write.js

const fs = require('fs')
const data = '每天一个helloworld，疾病远离我！'

// 创建一个可以写入的流，写入到文件 output.txt 中
const writeStream = fs.createWriteStream('output.txt')

// 使用 utf8 编码写入数据
writeStream.write(data, 'UTF8')

// 标记文件末尾
writeStream.end()

// 处理流事件 --> data, end, and error
writeStream.on('finish', () => {
	console.log('写入完成。')
})

writeStream.on('error', err => {
	console.log(err.stack)
})

console.log('执行完毕')
```

以上程序会将 data 变量的数据写入到 output.txt 文件中。代码执行结果如下：

```console
$ node stream-write.js
执行完毕
写入完成。
```

查看 output.txt 文件的内容：

```vim
$ cat output.txt
每天一个helloworld，疾病远离我！
```

---

#### 管道流

管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。

我们把文件比作装水的桶，而水就是文件里的内容，我们用一根管子(pipe)连接两个桶使得水从一个桶流入另一个桶，这样就慢慢的实现了大文件的复制过程。

以下实例我们通过读取一个文件内容并将内容写入到另外一个文件中。

设置 input-2.txt 文件内容如下：

> 每天一个 helloworld，疾病远离我！
> 嘤嘤嘤

代码如下：

```js
// stream-pipe.js

const fs = require('fs')

// 创建一个可读流
const readerStream = fs.createReadStream('./input-2.txt')

// 创建一个可写流
const writerStream = fs.createWriteStream('output-2.txt')

// 管道读写操作
// 读取 input-2.txt 文件内容，并将内容写入 output-2.txt 文件中
readerStream.pipe(writerStream)

console.log('执行完毕')
```

代码执行结果如下：

```console
$ node stream-pipe.js
执行完毕
```

查看 output-2.txt 文件的内容：

```vim
$ cat output-2.txt
每天一个helloworld，疾病远离我！
嘤嘤嘤
```

---

#### 链式流

链式是通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作。

接下来我们就是用管道和链式来压缩和解压文件。

代码如下：

```js
// compress.js

const fs = require('fs')
const zlib = require('zlib')

// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('./input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('./input.txt.gz'))

console.log('压缩完成')
```

代码执行结果如下：

```console
$ node compress.js
压缩完成
```

执行完以上操作后，当前目录下生成了 input.txt 的压缩文件 input.txt.gz。

代码如下：

```js
// decompress.js

const fs = require('fs')
const zlib = require('zlib')

// 解压 input.txt.gz 文件为 input-gz.txt
fs.createReadStream('./input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('./input-gz.txt'))

console.log('解压完成')
```

代码执行结果如下：

```console
$ node decompress.js
解压完成
```
