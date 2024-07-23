const express = require('express');

const serverApp = express();
const SERVER_PORT = 1245;

serverApp.get('/', (_, response) => {
  response.send('Hello Holberton School!');
});

serverApp.listen(SERVER_PORT, () => {
  console.log(`Server listening on PORT ${SERVER_PORT}`);
});

module.exports = serverApp;
