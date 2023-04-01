const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./router');
const app = express();

const allowedOrigins = ['http://localhost:5174', 'http://example.com'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports = app;
