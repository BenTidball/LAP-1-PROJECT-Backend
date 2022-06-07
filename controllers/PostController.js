const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const postData = require('../server/postData');
//const getPostData = require('../server/postData');

router.use(bodyParser.json());

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
    if (data.postId !== null && data.replyId === null && data.comment !== null) {
        res.send("Add up reaction to a post: TODO");
    } else if (data.postId !== null && data.replyId === null && data.comment !== null) {
        res.send("Add down reaction to a post: TODO");
    } else {
        res.status(400);
        res.send("Missing either postId or replyId or comment");
    }
});

router.post("/reaction", (req, res) => {
    const data = req.body;
    console.log(`Add reaction to a post: ${JSON.stringify(data)}`);
    if (data.postId !== null && data.replyId === null && data.reaction !== null) {
        res.send("Add up reaction to a post: TODO");
    } else if (data.postId !== null && data.replyId === null && data.reaction !== null) {
        res.send("Add down reaction to a post: TODO");
    } else {
        res.status(400);
        res.send("Missing either postId or replyId or reaction");
    }
});

router.post("/vote", (req, res) => {
    const data = req.body;
    console.log(`Add vote to a post: ${JSON.stringify(data)}`);
    if (data.postId !== null && data.replyId === null && data.voteType !== null) {
        res.send("Add up vote to a post: TODO");
    } else if (data.postId !== null && data.replyId === null && data.voteType !== null) {
        res.send("Add down vote to a post: TODO");
    } else {
        res.status(400);
        res.send("Missing either postId or replyId or voteType");
    }
});

module.exports = router;