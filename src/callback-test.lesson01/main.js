const fs = require('fs')

fs.readFile('./input.txt', (err, data) => {
  if (err) return console.log(err)
  console.log(data.toString())
})

console.log('程序结束！')