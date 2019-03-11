const eventEmitter = require('events').EventEmitter

const event = new eventEmitter()
event.on('test_1', () => {
  console.log('test_1 事件触发');
});
setTimeout(() => {
  event.emit('test_1')
}, 1000);
