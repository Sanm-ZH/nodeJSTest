const http = require('http');
const url = require('url');
 
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
 
    // 解析 url 参数
    const params = url.parse(req.url, true).query;
    res.write("name: " + params.name);
    res.write("\n");
    res.write("url: " + params.url);
    res.end();
 
}).listen(8888);