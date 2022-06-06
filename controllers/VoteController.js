const express = require('express');
const router = express.Router();
//const postData = require('../server/postData');
//const getPostData = require('../server/postData');

router.get("/", (req, res) => {
    res.send("Get vote");
});

router.post("/", (req, res) => {
    res.send("Add up/down vote to post or reply");
});

module.exports = router;