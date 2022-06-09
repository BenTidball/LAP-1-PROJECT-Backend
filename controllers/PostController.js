const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const postData = require('../server/readWriteJson');

router.use(bodyParser.json());

router.get("/topic/all", (req, res) => {
    postData.getAllTopic().then((listOfTopic) => {
        res.send(listOfTopic);
    });
});

router.get("/topic/:topic", (req, res) => {
    const topic = req.params.topic;
    postData.returnFile(topic).then((data)=>{
        res.send(data);
    });
});

router.get("/topic/search/:keyword", (req, res) => {
    const keyword = req.params.keyword;
    postData.searchInAllTopic(keyword).then((data) => {
        res.send(data);
    });
});

router.post("/comment", (req, res) => {
    const data = req.body;
    console.log(`Add comment to a post: ${JSON.stringify(data)}`);
    if ('postId' in data && 'topic' in data && 'comment' in data) {
        postData.createComment(data);
        res.send("Added comment");
    } else {
        res.status(400);
        res.send("Missing either postId or topic or comment");
    }
});

router.post("/reaction", (req, res) => {
    const data = req.body;
    console.log(`Add reaction to a post: ${JSON.stringify(data)}`);
    if ('postId' in data && 'replyId' in data && 'topic' in data && 'reactionType' in data) {
        postData.submitReaction(data);
        res.send("Added reaction");
    } else {
        res.status(400);
        res.send("Missing either postId or replyId or topic or reaction");
    }
});

router.post("/vote", (req, res) => {
    const data = req.body;
    console.log(`Add vote to a post: ${JSON.stringify(data)}`);
    if ('postId' in data && 'replyId' in data && 'topic' in data && 'voteType' in data) {
        postData.submitVote(data);
        res.send("Added vote");
    } else {
        res.status(400);
        res.send("Missing either postId or replyId or topic or voteType");
    }
});

router.post("/post", (req, res) => {
    const data = req.body;
    console.log(`Add a post: ${JSON.stringify(data)}`);
    if('postTopic' in data && 'postTitle' in data && 'postBody' in data) {
        postData.createNewPost(data);
    }else {
        res.status(400);
        res.send("Missing either postTopic or postTitle or postBody");
    }
})

module.exports = router;
