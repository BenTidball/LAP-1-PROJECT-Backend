const express = require('express');
const router = express.Router();
//const postData = require('../server/postData');
//const getPostData = require('../server/postData');

router.get("/", (req, res) => {
    res.send("Get all post");
});

router.post("/search", (req, res) => {
    const data = req.body;
    console.log(`Search a post: ${JSON.stringify(data)}`);
    res.send("Search a post");
});

router.post("/", (req, res) => {
    const data = req.body;
    console.log(`Add post: ${JSON.stringify(data)}`);
    res.send("Create a post");
});

router.post("/reply", (req, res) => {
    const data = req.body;
    console.log(`Add reply to a post: ${JSON.stringify(data)}`);
    res.send("Add reply to a post");
});

router.post("/emoji", (req, res) => {
    const data = req.body;
    console.log(`Add emoji to a post: ${JSON.stringify(data)}`);
    res.send("Add emoji to a post");
});

router.post("/vote", (req, res) => {
    const data = req.body;
    console.log(`Add vote to a post: ${JSON.stringify(data)}`);
    res.send("Add vote to a post");
});

module.exports = router;