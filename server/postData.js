const fs = require('fs');

const filepath = "./data/testpost.json";

function returnFile(){
  fs.exists(filepath, (e)=>{
    if(e){
      let rawdata = fs.readFileSync(filepath);
      let file = JSON.parse(rawdata);
      // console.log('file exists');
      return file;
    }else{
      console.error('no file exists');
    }
  })
}

module.exports = {returnFile};
