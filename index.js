const server = require('./server/app');
const port = 5000;

server.listen(port, ()=>{
    console.log(`Server is open on port: ${port}`);
})
