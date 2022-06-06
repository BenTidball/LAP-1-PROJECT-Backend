const express = require('express');
const router = express.Router();
//const postData = require('../server/postData');
//const getPostData = require('../server/postData');

router.get("/post/:postId", (req, res) => {
    res.send("Get vote by postId");
});

router.get("/reply/:replyId", (req, res) => {
    res.send("Get vote by replyId");
});

router.post("/", (req, res) => {
    const data = req.body;
    console.log(`Add vote: ${JSON.stringify(data)}`);
    res.send("Add up/down vote to post or reply");
});

module.exports = router;