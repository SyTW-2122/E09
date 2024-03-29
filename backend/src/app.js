const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();

//app.set('port', 4000 || process.env.PORT )

//use morgan to log requests to the console
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

module.exports = app;