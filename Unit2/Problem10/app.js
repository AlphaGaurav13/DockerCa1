const http = require('http');
http.createServer((req, res) => {
    res.end("secure Image demo running")
}).listen(3000);