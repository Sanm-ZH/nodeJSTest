const buf1 = Buffer.from('sanm-zh');
// 剪切缓冲区
const buf2 = buf1.slice(0, 2);
console.log("buffer_slice: " + buf2.toString());

const buf3 = Buffer.from('if(){}else{}');
//  缓冲区长度
console.log("buffer_length: " + buf3.length);