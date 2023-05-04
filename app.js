const express = require('express');
const cookieParser = require('cookie-parser');
const { eventContext } = require('@vendia/serverless-express/src/middleware');

const indexRouter = require('./routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// middleware config to let us parse the AWS Lambda event into `apiGateway`
app.use(eventContext());

app.use('/', indexRouter);

module.exports = app;
