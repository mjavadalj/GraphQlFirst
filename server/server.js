const http = require('http');

const port = 3000 || process.env.port;

const app = require('./app');

const server = http.createServer(app);

server.listen(port);