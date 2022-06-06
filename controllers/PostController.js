const express = require('express');
const router = express.Router();
const postData = require('../server/postData');
//const getPostData = require('../server/postData');

router.get("/", (req, res) => {
    res.send("Get all post");
});


router.get("/topic/:topic", (req, res) => {
    const topic = req.params.topic;
    postData.returnFile(topic).then((data)=>{
        res.send(data);
    });
});

router.get("/search/:query", (req, res) => {
    const query = req.params.query;
    res.send("Search a topic? post?");
});

router.post("/", (req, res) => {
    const data = req.body;
    console.log(`Add post: ${JSON.stringify(data)}`);
    res.send("Create a post");
});

router.post("/comment", (req, res) => {
    const data = req.body;
    console.log(`Add comment to a post: ${JSON.stringify(data)}`);
    res.send("Add comment to a post");
});

router.post("/reaction", (req, res) => {
    const data = req.body;
    console.log(`Add reaction to a post: ${JSON.stringify(data)}`);
    res.send("Add reaction to a post");
});

router.post("/vote", (req, res) => {
    const data = req.body;
    console.log(`Add vote to a post: ${JSON.stringify(data)}`);
    res.send("Add vote to a post");
});

module.exports = router;