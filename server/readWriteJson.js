const fs = require('fs').promises;

// returns json data to display information
const returnFile = async (filename) => {
  const data = await fs.readFile(`./data/${filename}.json`);
  return JSON.parse(data);
}

// overwrites json files with new updated json
async function createNewPost(data, category){
  // creating new post data
  const postdata = {
    "post-title": data.postTitle,
    "post-body": data.postBody,
  };

  // parsing json data to append new post to category data
  const categoryData = await fs.readFile(`./data/${category}.json`);
  const categorObject = JSON.parse(categoryData);
  categorObject.data.push(postdata);

  //overwriting file with new data
  fs.writeFile(`./data/${category}.json`, JSON.stringify(categorObject), err => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

module.exports = {returnFile, createNewPost};
