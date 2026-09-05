const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead("200", { "content-type": "text/plain" })
        res.end("Welcome to Rushi's webserver");
    } else if (req.url === '/status' && req.method === "GET") {
        res.writeHead("202", { "content-type": "text/plain" });
        res.end("idle");
    } else {
        res.writeHead(404, { "content-type": "application/json" })
        res.end("route dont exits")
    }
})

server.listen(3000, () => {
    console.log("Server is listening on http://localhost:3000/")
})