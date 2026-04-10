const http = require('http')
http.createServer((req, res) => {
    res.end("version 2");
}).listen(3000)