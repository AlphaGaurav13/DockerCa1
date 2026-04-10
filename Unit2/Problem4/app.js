const http = require('http')
const env = process.env.APP_ENV || "not set"
const db = process.env.DB_URL || "not set"


http.createServer((req, res) => {
    res.end(`ENV: ${env}\nDB: ${db}`);
}).listen(3000)

