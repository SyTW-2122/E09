const express = require('express');
const morgan = require('morgan');

const app = express();

app.set('port', 4000)

//use morgan to log requests to the console
app.use(express.json());
app.use(morgan('dev'));


module.exports = app;