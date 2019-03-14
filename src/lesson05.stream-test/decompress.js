const fs = require('fs')
const zlib = require('zlib')

// 解压 input.txt.gz 文件为 input-gz.txt
fs.createReadStream('./input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('./input-gz.txt'))

console.log('解压完成')