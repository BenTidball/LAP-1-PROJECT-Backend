const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const postData = require('../server/readWriteJson');

const bodyParser = require('body-parser');
router.use(bodyParser.json());

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
    // console.log(`Add post: ${JSON.stringify(data)}`);
    res.send("Create a post");
});

router.post("/comment", (req, res) => {
    const data = req.body;
    // console.log(`Add comment to a post: ${JSON.stringify(data)}`);
    res.send("Add comment to a post");
});

router.post("/reaction", (req, res) => {
    const data = req.body;
    // console.log(`Add reaction to a post: ${JSON.stringify(data)}`);
    res.send("Add reaction to a post");
});

router.post("/vote", (req, res) => {
    const data = req.body;
    console.log(`Add vote to a post: ${JSON.stringify(data)}`);
    if (data.postId !== null && data.replyId === null && data.updownvote !== null) {
        res.send("Add up vote to a post: TODO");
    } else if (data.postId !== null && data.replyId === null && data.updownvote !== null) {
        res.send("Add down vote to a post: TODO");
    } else {
        res.status(400);
        res.send("Missing either postId or replyId");
    }
});

router.post("/post", (req, res) => {
    console.log(req.body);
    postData.createNewPost(req.body, "cats2");
})

module.exports = router;
