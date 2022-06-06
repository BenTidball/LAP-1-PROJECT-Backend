const fs = require('fs').promises;
const filepath = "./data/testpost.json";

<<<<<<< HEAD
function returnFile(){
  try {
    var data = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
  }
  
=======
const returnFile = async () => {
  const data = await fs.readFile(filepath);
  return JSON.parse(data);
>>>>>>> 71346e99bfdc4ad48b1194e17066d40c679973ed
}



module.exports = {returnFile};
