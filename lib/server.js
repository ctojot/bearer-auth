'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./auth/router/index.js');
const bearerAuth = require('./auth/middleware/bearer.js');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use(authRoutes);



// Catchalls
app.use(notFound);
app.use(errorHandler);

app.get('/secure', bearerAuth, (req, res) => {
  console.log('AUTHENTICATE USER', req.user);
  res.send({data: req.user});
});

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};