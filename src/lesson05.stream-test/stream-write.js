const fs = require('fs');
const data = '每天一个helloworld，疾病远离我！';

// 创建一个可以写入的流，写入到文件 output.txt 中
const writeStream = fs.createWriteStream('output.txt');

// 使用 utf8 编码写入数据
writeStream.write(data, 'UTF8');

// 标记文件末尾
writeStream.end();

// 处理流事件 --> data, end, and error
writeStream.on('finish', () => {
  console.log('写入完成。')
});

writeStream.on('error', err => {
  console.log(err.stack)
});

console.log('执行完毕');