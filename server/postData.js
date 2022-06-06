const fs = require('fs').promises;
const filepath = "./data/testpost.json";

const returnFile = async () => {
  const data = await fs.readFile(filepath);
  return JSON.parse(data);
}



module.exports = {returnFile};
