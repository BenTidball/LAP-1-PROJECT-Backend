const express = require("express");
const app = express();
const GetRouter = require('../controllers/GetController');
const giphyRouter = require('../controllers/giphyAPI');
const PostRouter = require('../controllers/PostController');

app.get("/", (req, res) => {
    res.send("backend test");
});

app.use('/gif', giphyRouter);
app.use('/get', GetRouter);
app.use('/post', PostRouter);

module.exports = app;
