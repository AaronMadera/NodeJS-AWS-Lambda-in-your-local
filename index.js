const app = require('./app');
const http = require('http');

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', (e) => {
    console.error(e);
    process.exit(1);
});
server.on('listening', () => {
    console.log('listening on port %s', port)
});
