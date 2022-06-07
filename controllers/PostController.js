const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const postData = require('../server/readWriteJson');

router.use(bodyParser.json());

router.get("/", (req, res) => {
    res.send("Get all post: TODO");
});

router.get("/topic/:topic", (req, res) => {
    const topic = req.params.topic;
    postData.returnFile(topic).then((data)=>{
        res.send(data);
    });
});

router.get("/search/:query", (req, res) => {
    const query = req.params.query;
    res.send("Search a topic? post?: TODO");
});

router.post("/comment", (req, res) => {
    const data = req.body;
    console.log(`Add comment to a post: ${JSON.stringify(data)}`);
    if (data.postId !== null && data.topic !== null && data.comment !== null) {
        let inputData = {};
        inputData[`post-id`] = data.postId;
        inputData[`replyBody`] = data.comment;
        postData.createComment(inputData, data.topic, inputData);
        res.send("Added comment");
    } else {
        res.status(400);
        res.send("Missing either postId or topic or comment");
    }
});

router.post("/reaction", (req, res) => {
    const data = req.body;
    console.log(`Add reaction to a post: ${JSON.stringify(data)}`);
    if (data.postId !== null && data.replyId === null && data.topic !== null && data.reactionType !== null) {
        postData.submitReaction(data, data.topic);
        res.send("Added reaction");
    } else if (data.postId !== null && data.replyId === null && data.topic !== null && data.reactionType !== null) {
        postData.submitReaction(data, data.topic);
        res.send("Added reaction");
    } else {
        res.status(400);
        res.send("Missing either postId or replyId or topic or reaction");
    }
});

router.post("/vote", (req, res) => {
    const data = req.body;
    console.log(`Add vote to a post: ${JSON.stringify(data)}`);
    if (data.postId !== null && data.replyId === null && data.topic !== null && data.voteType !== null) {
        postData.submitVote(data, data.topic);
        res.send("Added vote");
    } else if (data.postId !== null && data.replyId === null && data.topic !== null && data.voteType !== null) {
        postData.submitVote(data, data.topic);
        res.send("Added vote");
    } else {
        res.status(400);
        res.send("Missing either postId or replyId or topic or voteType");
    }
});

router.post("/post", (req, res) => {
    const data = req.body;
    if(data.postTitle != null && data.postBody != null){
        postData.createNewPost(data, "cats");
    }else {
        res.status(400);
        res.send("Ensure your post has a title and message");
    }
})

module.exports = router;
