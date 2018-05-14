const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  path = require('path');

require('dotenv').config();

// check enviroment
const DB_URL = (app.settings.env === 'testing') ? process.env.DB_URL_TEST : process.env.DB_URL;

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

app.use('/scripts', express.static(__dirname + '/node_modules'));
app.use(express.static(path.join(__dirname, 'client')));


// Routes
const routes = require('./server/routes/index');
app.use('/api', routes);
app.get('*', (req, res) => {
  res.sendfile('./client/index.html');
});

app.listen(process.env.PORT, () => {
  console.log('Application running on port ' + process.env.PORT);
});