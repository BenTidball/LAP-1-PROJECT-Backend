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
    "post-id": 0,
    "post-title": data.postTitle,
    "post-body": data.postBody,
    "post-reactions": {"reacion1": 0, "reaction2": 0, "reaction3": 0},
    "post-comments": [],
    "post-vote": {"upvote": 0, "downvote": 0}
  };

  // parsing json data to append new post to category data
  const categoryData = await fs.readFile(`./data/${category}.json`);
  const categorObject = JSON.parse(categoryData);

  // assign post id as an increment of the length of the data
  postdata["post-id"] = categorObject.data.length +1;
  console.log(postdata["post-id"]);
  //appending new postdata to the array
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
