const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const bodyParser = require('body-parser');
const app =express();
const resumeRouter = require("./routers/resumeRouter");

if(process.env.NODE_ENV === "development") app.use(morgan("dev"));


app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

app.use('/api/v1/aiRec', resumeRouter);

module.exports = app;
