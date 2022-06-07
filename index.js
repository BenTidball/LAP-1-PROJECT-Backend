const server = require('./server/app');

const port = process.env.PORT || 5000; // if there is no PORT env variable, 5000 will be used
server.listen(port, () => console.log(`Express is running on port ${port}`))
