const express = require('express');
const router = express.Router();
//const postData = require('../server/postData');
//const getPostData = require('../server/postData');

router.get("/", (req, res) => {
    res.send("Get all reply");
});

router.get("/:id", (req, res) => {
    res.send("Get reply by ID");
});

router.post("/", (req, res) => {
    const data = req.body;
    console.log(`Add reply: ${JSON.stringify(data)}`);
    res.send("Create a reply");
});

module.exports = router;