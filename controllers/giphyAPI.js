const express = require('express')
const fs = require('fs');
const router = express.Router();

const apikey = 'KjhTKrHYVKk4fs2vueEKEy2poFC5QzPy';

router.get("/", (req, res) => {
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apikey}&limit=5`)
    .then(response =>  response.json())
    .then(data => JSON.stringify(data))
    .then(data => {res.send(data)});
});

router.get("/:id", (req, res) => {
    fetch(`https://api.giphy.com/v1/gifs?api_key=${apikey}&ids=21GmfgafQTNPL9oqD5`)
    .then(response => response.json())
    .then(data => JSON.stringify(data))
    .then(data => {res.send(data)});
});


module.exports = router;
