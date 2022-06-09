const fs = require('fs').promises;

// returns json data to display information
const returnFile = async (filename) => {
  try {
    const data = await fs.readFile(`./data/${filename}.json`);
    return JSON.parse(data);
  } catch(err) {
    console.log(err);
    return JSON.parse("{}");
  }
}

async function getAllTopic() {
  try {
    return await readFile(`dontdeleteme`);
  } catch(err) {
    console.log(err);
    return JSON.parse("[]");
  }
}

async function searchInAllTopic(keyword) {
  let allTopic = [];
  const listOfFilename = await readFile(`dontdeleteme`);
  listOfFilename.forEach((curFilename) => {
    allTopic.push(readFile(curFilename));
  });
  return Promise.all(allTopic).then((listOfTopic) => {
    let result = [];
    listOfTopic.map((curTopic) => {
      let listOfPost = curTopic.data;
      listOfPost.map((curPost) => {
        let postTitle = curPost[`post-title`];
        let postBody = curPost[`post-body`];
        let postTitleMatch = postTitle.toLowerCase().includes(keyword.toLowerCase().trim());
        let postBodyMatch = postBody.toLowerCase().includes(keyword.toLowerCase().trim());
        if (postTitleMatch || postBodyMatch) {
          result.push(curPost);
        } else {
          let listOfComment = curPost[`post-comments`];
          listOfComment.forEach((curComment) => {
            let commentBody = curComment[`reply-body`];
            let replyBodyMatch = commentBody.toLowerCase().includes(keyword.toLowerCase().trim());
            if (replyBodyMatch) {
              result.push(curPost);
            }
          });
        }
      })
    });
    return result;
  });
}

// creates a new post within the current topic
async function createNewPost(data){
  // creating new post data

  data.postTopic = data.postTopic.toLowerCase();
  const postdata = {
    "post-id": 0,
    "post-topic": data.postTopic,
    "post-title": data.postTitle,
    "post-body": data.postBody,
    "post-reactions": {"reaction1": 0, "reaction2": 0, "reaction3": 0},
    "post-comments": [],
    "post-vote": {"upvote": 0, "downvote": 0},
    "post-gif": data.postGif
  };

   let newTopic = false;
   const allPostObject = await readFile(data.postTopic);
   if (allPostObject.data.length == 0) {
    allPostObject.topic = data.postTopic;
    newTopic = true;
   }
 
   // assign post id as an increment of the length of the data
   postdata["post-id"] = allPostObject.data.length +1;
   //appending new postdata to the array
   allPostObject.data.push(postdata);
 
   //overwriting file with new data
   fs.writeFile(`./data/${data.postTopic}.json`, JSON.stringify(allPostObject)), err => {
     console.log(err)
   }

   if (newTopic) {
    let topics = await readFile(`dontdeleteme`);
    topics.push(data.postTopic);
    writeFile(`dontdeleteme`, topics);
   }
}

//creates a new comment within a existing posts comment array, inputs required are the data/post, the catergory the post exists within, and lastly the post on which the comment is applied
async function createComment(data, topic, post){
  const commentData = {
    "reply-id": 0,
    "reply-reactions":{"reaction1":0,"reaction2":0,"reaction3":0},
    "reply-body": data.replyBody,
    "reply-vote":{"upvote":0,"downvote":0},
    "reply-gif": data.replyGif
  }
    
  const topicObject = await readFile(topic);
  if (topicObject.topic !== null) {
    //find post within json and append comment to it 
    let targetPost;
    let targetIndex;
    topicObject.data.forEach((element, index) => {
      if(element['post-id'] == post['post-id']){
        targetPost = element;
        targetIndex = index;
      }
    });

    if (targetIndex.topic !== undefined) {
      // assign post id as an increment of the length of the comment array
      if (targetPost.topic === undefined) {
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
}

async function submitReaction(data, topic) {
  const topicObject = await readFile(topic);
  if (topicObject.topic !== null) {
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
}

async function submitVote(data, topic) {
  // parsing json data to append new post to topic data
  const topicObject = await readFile(topic);
  if (topicObject.topic !== null) {
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
}

async function readFile(topic) {
  try {
    const topicData1 = await fs.readFile(`./data/${topic}.json`);
    return JSON.parse(topicData1);
  } catch (err) {
    try {
      // Try one more time
      const topicData2 = await fs.readFile(`./data/${topic}.json`);
      return JSON.parse(topicData2);
    } catch (err) {
      try {
        // Try one more time
        const topicData3 = await fs.readFile(`./data/${topic}.json`);
        return JSON.parse(topicData3);
      } catch (err) {
        return JSON.parse(`{"topic":null,"data":[]}`);
      }
    }
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
//   "post-vote": {"upvote": 0, "downvote": 0},
//   "post-gif": {"gif data": 0}
// })

module.exports = {returnFile, getAllTopic, searchInAllTopic, createNewPost, createComment, submitReaction, submitVote};


// createNewPost({postTitle:"Cat 100",postBody:"This is a Cat 100"}, "cats");
