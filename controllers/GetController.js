const express = require('express')
const router = express.Router();
const postData = require('../server/postData');
const getPostData = require('../server/postData')

// Test routes - to be deleted before push/merge with main
router.get("/", (req, res) => {
    res.send("backend server get test");
});

router.get("/readPost", (req, res) => {
    res.send(getPostData.returnFile());
});


module.exports = router;
