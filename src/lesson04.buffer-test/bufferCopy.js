const buf1 = Buffer.from('******* if(){}else{}')
const buf2 = Buffer.from('Sanm-ZH')

//将 buf2 插入到 buf1 指定位置上
buf2.copy(buf1, 0)

console.log(buf1.toString())