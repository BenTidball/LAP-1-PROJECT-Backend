const express = require("express");
const app = express();
const testGetRouter = require('../controllers/GetController');
const giphyRouter = require('../controllers/giphyAPI');

app.get("/", (req, res) => {
    res.send("backend test");
});

app.use('/test', testGetRouter);
app.use('/gif', giphyRouter);

module.exports = app;
