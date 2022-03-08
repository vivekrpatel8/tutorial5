const express = require("express");

const app = express();

const userRoute = require("./api/routes/userRoute");

app.use("/", userRoute);

module.exports = app;
