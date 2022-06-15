const express = require('express');
const morgan = require('morgan');

const app = express();

//use morgan to log requests to the console
app.use(morgan('dev'));

module.exports = app;