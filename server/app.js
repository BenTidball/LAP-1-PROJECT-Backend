const testGetRouter = require('../controllers/GetController');
const express = require("express");
const app = express();

app.use('/test', testGetRouter);

app.get("/", (req, res) => {
    console.log('test');
    res.send("backend test");
});

const port = 5500;
app.listen(port, ()=> {
    console.log(`Server is running on ${port}`);
})
