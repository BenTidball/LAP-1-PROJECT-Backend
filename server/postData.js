const fs = require('fs').promises;

const returnFile = async (filename) => {
  const data = await fs.readFile(`./data/${filename}.json`);
  return JSON.parse(data);
}

module.exports = {returnFile};
