const httpServer = require('http');

const SERVER_PORT = 1245;
const SERVER_HOST = 'localhost';
const serverApp = httpServer.createServer();

serverApp.on('request', (_, response) => {
  const message = 'Hello Holberton School!';

  response.setHeader('Content-Type', 'text/plain');
  response.setHeader('Content-Length', message.length);
  response.statusCode = 200;
  response.write(Buffer.from(message));
});

serverApp.listen(SERVER_PORT, SERVER_HOST, () => {
  process.stdout.write(`Server listening at -> http://${SERVER_HOST}:${SERVER_PORT}\n`);
});

module.exports = serverApp;
