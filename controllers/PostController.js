const express = require('express');
const router = express.Router();
//const postData = require('../server/postData');
//const getPostData = require('../server/postData');

router.get("/", (req, res) => {
    res.send("Get all post");
});

router.get("/:id", (req, res) => {
    res.send("Get post by ID");
});

router.post("/", (req, res) => {
    const data = req.body;
    console.log(`Add post: ${JSON.stringify(data)}`);
    res.send("Create a post");
});

module.exports = router;