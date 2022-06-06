const express = require('express')
const router = express.Router();
const postData = require('../postData');

// Test routes - to be deleted before push/merge with main
router.get("/testGet/readPost", (req, res) => {
    res.send("backend server get test");
});

module.exports = {router};
