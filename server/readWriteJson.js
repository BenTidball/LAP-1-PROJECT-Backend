const fs = require('fs').promises;

// returns json data to display information
const returnFile = async (filename) => {
  const data = await fs.readFile(`./data/${filename}.json`);
  return JSON.parse(data);
}

// creates a new post within the current category
async function createNewPost(data, category){
  // creating new post data
  const postdata = {
    "post-id": 0,
    "post-title": data.postTitle,
    "post-body": data.postBody,
    "post-reactions": {"reaction1": 0, "reaction2": 0, "reaction3": 0},
    "post-comments": [],
    "post-vote": {"upvote": 0, "downvote": 0}
  };

  // parsing json data to append new post to category data
  const categoryData = await fs.readFile(`./data/${category}.json`);
  const categorObject = JSON.parse(categoryData);

  // assign post id as an increment of the length of the data
  postdata["post-id"] = categorObject.data.length +1;
  //appending new postdata to the array
  categorObject.data.push(postdata);
  
  //overwriting file with new data
  await writeFile(category, categorObject);
}

//creates a new comment within a existing posts comment array, inputs required are the data/post, the catergory the post exists within, and lastly the post on which the comment is applied
async function createComment(data, category, postID){
  const commentData = {
    "reply-id": 0,
    "reply-reactions":{"reaction1":0,"reaction2":0,"reaction3":0},
    "reply-body": data.replyBody,
    "reply-vote":{"upvote":0,"downvote":0}
  }
    
  // parsing json data to append new post to category data
  const categoryData = await fs.readFile(`./data/${category}.json`);
  const categorObject = JSON.parse(categoryData);

  //find post within json and append comment to it 
  let targetPost;
  let targetIndex;
  categorObject.data.forEach((element, index) => {
    if(element['post-id'] == post['post-id']){
      targetPost = element;
      targetIndex = index;
    }
  });

  if (targetIndex !== undefined) {
    // assign post id as an increment of the length of the comment array
    if (targetPost === undefined) {
      commentData["reply-id"] = 1;
    } else {
      commentData["reply-id"] = targetPost['post-comments'].length +1;
    }
    
    //append comment to comments array
    targetPost['post-comments'].push(commentData);

    categorObject.data[targetIndex] = targetPost;

    //overwriting file with new data
    await writeFile(category, categorObject);
  }
}

async function submitReaction(data, category) {
  // parsing json data to append new post to category data
  const categoryData = await fs.readFile(`./data/${category}.json`);
  const categorObject = JSON.parse(categoryData);
  if (data.postId !== null && data.replyId !== null) {
    categorObject.data.forEach(element => {
      if (element[`post-id`] === data.postId){
        let listOfComments = element[`post-comments`];
        listOfComments.forEach(curComment => {
          if (curComment[`reply-id`] === data.replyId) {
            curComment[`reply-reactions`][data.reactionType]++;
          }
        });
      }
    });
    await writeFile(category, categorObject);
  } else if (data.postId !== null && data.replyId === null) {
    categorObject.data.forEach(element => {
      if (element[`post-id`] === data.postId){
        element[`post-reactions`][data.reactionType]++;
      }
    });
    await writeFile(category, categorObject);
  }
}

async function submitVote(data, category) {
  // parsing json data to append new post to category data
  const categoryData = await fs.readFile(`./data/${category}.json`);
  const categorObject = JSON.parse(categoryData);
  if (data.postId !== null && data.replyId !== null) {
    categorObject.data.forEach(element => {
      if (element[`post-id`] === data.postId){
        let listOfComments = element[`post-comments`];
        listOfComments.forEach(curComment => {
          if (curComment[`reply-id`] === data.replyId) {
            curComment[`reply-vote`][data.voteType]++;
          }
        });
      }
    });
    await writeFile(category, categorObject);
  } else if (data.postId !== null && data.replyId === null) {
    categorObject.data.forEach(element => {
      if (element[`post-id`] === data.postId){
        element[`post-vote`][data.voteType]++;
      }
    });
    await writeFile(category, categorObject);
  }
}

async function writeFile(category, categorObject) {
  //overwriting file with new data
  fs.writeFile(`./data/${category}.json`, JSON.stringify(categorObject), err => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

//Create comment test block
// createComment({replyBody: "reply test"}, 'cats',{
//   "post-id": 0,
//   "post-title": "test",
//   "post-body": "test",
//   "post-reactions": {"reacion1": 0, "reaction2": 0, "reaction3": 0},
//   "post-comments": [],
//   "post-vote": {"upvote": 0, "downvote": 0}
// })

module.exports = {returnFile, createNewPost, createComment, submitReaction, submitVote};
