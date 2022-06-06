const express = require("express");
const app = express();
const testGetRouter = require('../controllers/GetController');
const PostRouter = require('../controllers/PostController');
const ReplyRouter = require('../controllers/ReplyController');
const EmojiRouter = require('../controllers/EmojiController');
const VoteRouter = require('../controllers/VoteController');

app.get("/", (req, res) => {
    res.send("backend test");
});

app.use('/test', testGetRouter);
app.use('/post', PostRouter);
app.use('/reply', ReplyRouter);
app.use('/emoji', EmojiRouter);
app.use('/vote', VoteRouter);

module.exports = app;
