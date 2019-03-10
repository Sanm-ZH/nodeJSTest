// 引入 event 模块
const event = require('events')
// 创建 eventEmitter 对象
const eventEmitter = new event.EventEmitter()

// 创建事件处理程序
const connectHandler = () => {
  console.log('连接成功。');

  // 触发 test_1 事件 
  eventEmitter.emit('test_1');
}

// 绑定 connection 事件处理程序
eventEmitter.on('connection', connectHandler);

// 使用匿名函数绑定 test_1 事件
eventEmitter.on('test_1', () => {
  console.log('数据接收成功。');
});

// 触发 connection 事件 
eventEmitter.emit('connection');

console.log("程序执行完毕。");