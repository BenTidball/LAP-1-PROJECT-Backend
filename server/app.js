const express = require("express");
const app = express();
const testGetRouter = require('../controllers/GetController');
<<<<<<< HEAD
const giphyRouter = require('../controllers/giphyAPI');
=======
const PostRouter = require('../controllers/PostController');
>>>>>>> 71346e99bfdc4ad48b1194e17066d40c679973ed

app.get("/", (req, res) => {
    res.send("backend test");
});

app.use('/test', testGetRouter);
<<<<<<< HEAD
app.use('/gif', giphyRouter);
=======
app.use('/post', PostRouter);
>>>>>>> 71346e99bfdc4ad48b1194e17066d40c679973ed

module.exports = app;
