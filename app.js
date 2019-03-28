'use strict';
const express = require('express');
const cors = require('cors')({
    origin: true
});
const bodyParser = require('body-parser');
const router = require('./app/routes/routes')

const app = express();

app.use(cors);
app.use(bodyParser.urlencoded({
    limit: '5mb',
    extended: 'true',
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.use('/api/v1/', router);

module.exports = app;