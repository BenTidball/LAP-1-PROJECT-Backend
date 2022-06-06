const testGetRouter = require('../controllers/GetController');
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    console.log('test');
    res.send("backend test");
});

app.get(testGetRouter, (req, res) => {
    res.send("backend server");
});

const port = 5500;
app.listen(port, ()=> {
    console.log(`Server is running on ${port}`);
})
