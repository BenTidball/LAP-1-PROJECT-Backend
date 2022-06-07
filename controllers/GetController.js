const express = require('express')
const router = express.Router();
const getPostData = require('../server/readWriteJson')

router.get("/", (req, res) => {
    res.send("backend server");
});

router.get("/readPost", (req, res) => {
    getPostData.returnFile(`cats`).then((data)=>{
        res.send(data);
    });
});

module.exports = router;
