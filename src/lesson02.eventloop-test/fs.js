const fs = require('fs');

fs.readFile('./input.txt', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data.toString())
});

console.log('程序执行完！');