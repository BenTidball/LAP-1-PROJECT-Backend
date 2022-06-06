const express = require("express");
const app = express();
const testGetRouter = require('../controllers/GetController');

app.get("/", (req, res) => {
    res.send("backend test");
});

app.use('/test', testGetRouter);

module.exports = app;
