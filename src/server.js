/* eslint-disable indent */
/* eslint-disable no-unused-vars */
'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const clothRouter = require('./routes/clothes');
const foodRouter = require('./routes/food');

const notFoundHndler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/api/v1/cloth/', clothRouter);
app.use('/api/v1/food/', foodRouter);

app.get('/', HomeHandler);

function  HomeHandler(req, res) 
 {
    res.send('Hello World');
 }


app.use('*', notFoundHndler);
app.use(errorHandler);

module.exports = 
{
    app: app,
    start: (port) => {
      const PORT = port || 8080;
      app.listen(PORT, () => console.log(`Listening on ${PORT}`));
    },
};