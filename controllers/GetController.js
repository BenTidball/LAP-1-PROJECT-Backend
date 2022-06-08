const express = require('express')
const router = express.Router();
const getPostData = require('../server/readWriteJson')

router.get("/", (req, res) => {
    res.send("backend server");
});

router.get("/posts/:id", (req, res) => {
    getPostData.returnFile(req.params.id.toString()).then((data)=>{
        res.send(data);
    });
});

module.exports = router;
