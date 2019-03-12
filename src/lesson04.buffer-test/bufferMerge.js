const buf1 = Buffer.from('张三')
const buf2 = Buffer.from('李四')
const buf3 = Buffer.from('王二麻子')
const buf4 = Buffer.concat([buf1, buf2, buf3])

console.log(`buf4: ${buf4.toString()}`)