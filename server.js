var express = require('express'),
  app = express();

app.get('/', function(request, response) {
  response.send('hello world');
});

app.listen(3000, function() {
  console.log('Application running on port 3000');
});