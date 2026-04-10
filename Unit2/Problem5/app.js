const http = require('http');

http.createServer((req, res) => {
  res.end("App running 🚀");
}).listen(3000);