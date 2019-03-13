const fs = require('fs');

// 创建一个可读流
const readerStream = fs.createReadStream('./input-2.txt');

// 创建一个可写流
const writerStream = fs.createWriteStream('output-2.txt');

// 管道读写操作
// 读取 input-2.txt 文件内容，并将内容写入 output-2.txt 文件中
readerStream.pipe(writerStream);

console.log('执行完毕');