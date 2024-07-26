var express = require('express');

var app = express();
var portNumber = 7865;

app.get('/', (_, res) => {
  res.send('Welcome to the payment system');
});

app.get('/cart/:id(\\d+)', (req, res) => {
  var id = req.params.id;

  res.send(`Payment methods for cart ${id}`);
});

app.listen(portNumber, () => {
  console.log(`API available on localhost portNumber ${portNumber}`);
});

module.exportNumbers = app;
