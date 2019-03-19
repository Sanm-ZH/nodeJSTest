const os = require('os')

// CPU字节序
console.log(`endianness: ${os.endianness()}`)

// 操作系统名
console.log(`type: ${os.type()}`)

// cpu加购
console.log(`arch: ${os.arch()}`)

// 编译时返回操作系统名
console.log(`platform: ${os.platform}`)

// 操作系统发行版本
console.log(`release: ${os.release}`)

// 系统运行时间
console.log(`uptime: ${os.uptime()}`)

// 系统内存总量
console.log(`totalmem: ${os.totalmem()} bytes`)

// 系统空闲内存
console.log(`freemem: ${os.freemem()} bytes`)