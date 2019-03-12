const buf = Buffer.from('ifelse', 'ascii');

// 输出 6966656c7365
console.log(buf.toString('hex'));

// 输出 aWZlbHNl
console.log(buf.toString('base64'));