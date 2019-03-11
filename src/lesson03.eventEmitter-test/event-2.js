const eventEmitter = require('events').EventEmitter
const event = new eventEmitter()

event.on('someEvent', (arg1, arg2) => {
  console.log('listener1', arg1, arg2)
})
event.on('someEvent', (arg1, arg2) => {
  console.log('listener2', arg1, arg2)
})

event.emit('someEvent', 'arg1 参数', 'arg2 参数')