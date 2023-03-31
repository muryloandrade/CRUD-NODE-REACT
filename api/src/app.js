const express = require('express');
const bodyParser = require('body-parser');

const router = require('./router');
const app = express();


app.use(router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports = app;
