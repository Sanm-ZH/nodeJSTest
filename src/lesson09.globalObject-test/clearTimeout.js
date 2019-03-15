function printHello(){
  console.log( "Hello, World!");
}
// 两秒后执行以上函数
const t = setTimeout(printHello, 2000);

// 清除定时器
clearTimeout(t);