const fs = require('fs').promises;

// returns json data to display information
const returnFile = async (filename) => {
  const data = await fs.readFile(`./data/${filename}.json`);
  return JSON.parse(data);
}

// creates a new post within the current topic
async function createNewPost(data, topic){
  // creating new post data
  const postdata = {
    "post-id": 0,
    "post-title": data.postTitle,
    "post-body": data.postBody,
    "post-reactions": {"reaction1": 0, "reaction2": 0, "reaction3": 0},
    "post-comments": [],
    "post-vote": {"upvote": 0, "downvote": 0}
  };

  // parsing json data to append new post to topic data
  const topicData = await fs.readFile(`./data/${topic}.json`);
  const topicObject = JSON.parse(topicData);

  // assign post id as an increment of the length of the data
  postdata["post-id"] = topicObject.data.length +1;
  //appending new postdata to the array
  topicObject.data.push(postdata);
  
  //overwriting file with new data
  await writeFile(topic, topicObject);
}

//creates a new comment within a existing posts comment array, inputs required are the data/post, the catergory the post exists within, and lastly the post on which the comment is applied
async function createComment(data, topic, post){
  const commentData = {
    "reply-id": 0,
    "reply-reactions":{"reaction1":0,"reaction2":0,"reaction3":0},
    "reply-body": data.replyBody,
    "reply-vote":{"upvote":0,"downvote":0}
  }
    
  // parsing json data to append new post to topic data
  const topicData = await fs.readFile(`./data/${topic}.json`);
  const topicObject = JSON.parse(topicData);

  //find post within json and append comment to it 
  let targetPost;
  let targetIndex;
  topicObject.data.forEach((element, index) => {
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

    topicObject.data[targetIndex] = targetPost;

    //overwriting file with new data
    await writeFile(topic, topicObject);
  }
}

async function submitReaction(data, topic) {
  // parsing json data to append new post to topic data
  const topicData = await fs.readFile(`./data/${topic}.json`);
  const topicObject = JSON.parse(topicData);
  if (data.postId !== null && data.replyId !== null) {
    topicObject.data.forEach(element => {
      if (element[`post-id`] === data.postId){
        let listOfComments = element[`post-comments`];
        listOfComments.forEach(curComment => {
          if (curComment[`reply-id`] === data.replyId) {
            curComment[`reply-reactions`][data.reactionType]++;
          }
        });
      }
    });
    await writeFile(topic, topicObject);
  } else if (data.postId !== null && data.replyId === null) {
    topicObject.data.forEach(element => {
      if (element[`post-id`] === data.postId){
        element[`post-reactions`][data.reactionType]++;
      }
    });
    await writeFile(topic, topicObject);
  }
}

async function submitVote(data, topic) {
  // parsing json data to append new post to topic data
  const topicData = await fs.readFile(`./data/${topic}.json`);
  const topicObject = JSON.parse(topicData);
  if (data.postId !== null && data.replyId !== null) {
    topicObject.data.forEach(element => {
      if (element[`post-id`] === data.postId){
        let listOfComments = element[`post-comments`];
        listOfComments.forEach(curComment => {
          if (curComment[`reply-id`] === data.replyId) {
            curComment[`reply-vote`][data.voteType]++;
          }
        });
      }
    });
    await writeFile(topic, topicObject);
  } else if (data.postId !== null && data.replyId === null) {
    topicObject.data.forEach(element => {
      if (element[`post-id`] === data.postId){
        element[`post-vote`][data.voteType]++;
      }
    });
    await writeFile(topic, topicObject);
  }
}

async function writeFile(topic, topicObject) {
  //overwriting file with new data
  fs.writeFile(`./data/${topic}.json`, JSON.stringify(topicObject), err => {
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
