const express = require('express');
const cors = require('cors')
const app = express();

app.get('/', (req, res) => {
    res.send("backend server");
})

const port = 5000;
app.listen(port, ()=> {
    console.log(`Server is running on ${port}`);
})
