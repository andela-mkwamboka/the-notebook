const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  cors = require('cors');

require('dotenv').config();

// app configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// check enviroment
const DB_URL = (process.env.NODE_ENV === 'test') ? process.env.DB_URL_TEST : process.env.DB_URL;
// database connection
mongoose.connect(DB_URL, (error) => {
  if (error) {
    console.log('ERROR:', error);
  } else {
    console.log('Connnection successful');
  }
});

// app configuration
app.use(cors()); // prevent app from making other calls
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
const routes = require('./server/routes/index');
app.use('/api', routes);

app.get('/', (request, response) => {
  response.send('Hello world');
});
app.listen(process.env.PORT, () => {
  console.log('Application running on port ' + process.env.PORT);
});

module.exports = app;