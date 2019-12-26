const http = require('http');

const port = 3000;

const app = require('./app');

const server = http.createServer(app);

server.listen(process.env.PORT || port ,()=>{console.log("server is Up")} );