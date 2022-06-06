const fs = require('fs');

const filepath = "./data/testpost.json";

function returnFile(){
  try {
    var data = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
  }
  
}

module.exports = {returnFile};
