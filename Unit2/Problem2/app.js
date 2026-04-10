const http = require('http');

http.createServer((req, res) => {
  res.end("App started automatically");
}).listen(3000);