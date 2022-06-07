const request = require("supertest");
let basePath = `http://localhost:5000`;
const topic = `cats`;

describe('Test vote part', () => {
  
  describe('Test vote part', () => {
    it('Test if data set exist', async () => {
        const response = await request(basePath).get(`/post/topic/${topic}`);
        let returnObject = JSON.parse(response.text);
        expect(returnObject).not.toBeNull();
    });

    it('Test if number of post > 0', async () => {
        const response = await request(basePath).get(`/post/topic/${topic}`);
        let listOfData = getListOfPostObject(response);
        expect(listOfData.length).toBeGreaterThan(0);
    });

    it('Test if first post is not null', async () => {
        const response = await request(basePath).get(`/post/topic/${topic}`);
        let object = getPostFirstObject(response, 0);
        expect(object).not.toBeNull();
    });

    it('Test if post has vote attribute', async () => {
        const response = await request(basePath).get(`/post/topic/${topic}`);
        let object = getPostFirstObject(response, 0);
        expect(object[`post-vote`]).not.toBeNull();
    });

    it('Test if post has up vote attribute', async () => {
        const response = await request(basePath).get(`/post/topic/${topic}`);
        let object = getPostVoteByPosition(response, 0);
        expect(object.upvote).not.toBeNull();
    });

    it('Test if post has down vote attribute', async () => {
        const response = await request(basePath).get(`/post/topic/${topic}`);
        let object = getPostVoteByPosition(response, 0);
        expect(object.downvote).not.toBeNull();
    });

    it('Test submit a vote with null attribute', async () => {
      const voteData = {
        postId: null,
        replyId: null,
        topic: null,
        voteType: null
      };
      await request(basePath)
        .post(`/post/vote`)
        .send(voteData)
        .expect(400);
    });

    it('Test submit a up vote to a post', async () => {
      await request(basePath).get(`/post/topic/${topic}`).then((beforeUpvote) => {
        let beforeObject = getPostVoteByPosition(beforeUpvote, 0);
        const voteData = {
          postId: beforeObject.postId,
          replyId: beforeObject.replyId,
          topic: topic,
          voteType: "upvote"
        };
        request(basePath)
        .post(`/post/vote`)
        .send(voteData)
        .expect(200)
        .then(()=>{
          request(basePath).get(`/post/topic/${topic}`).then((afterUpvote) => {
            let afterObject = getPostVoteByPosition(afterUpvote, 0);
            expect(beforeObject.upvote + 1).toBe(afterObject.upvote);
          });
        });
      });
    });

    it('Test submit a down vote to a post', async () => {
      await request(basePath).get(`/post/topic/${topic}`).then((beforeDownvote) => {
        let beforeObject = getPostVoteByPosition(beforeDownvote, 0);
        const voteData = {
          postId: beforeObject.postId,
          replyId: beforeObject.replyId,
          topic: topic,
          voteType: "downvote"
        };
        request(basePath)
        .post(`/post/vote`)
        .send(voteData)
        .expect(200)
        .then(()=>{
          request(basePath).get(`/post/topic/${topic}`).then((afterDownvote) => {
            let afterObject = getPostVoteByPosition(afterDownvote, 0);
            expect(beforeObject.downvote + 1).toBe(afterObject.downvote);
          });
        });
      });
    });
  });
});

function getListOfPostObject(responseObject) {
  let returnObject = JSON.parse(responseObject.text);
  return returnObject.data;
}

function getPostFirstObject(responseObject, pos) {
  let listOfData = getListOfPostObject(responseObject);
  let object = listOfData[pos];
  return object;
}

function getPostVoteByPosition(responseObject, pos) {
  let object = getPostFirstObject(responseObject, pos);
  let voteAttribute = object[`post-vote`];
  let postId = object[`post-id`];
  let upVote = voteAttribute.upvote;
  let downVote = voteAttribute.downvote;
  return {
    postId: postId,
    replyId: null,
    upvote: upVote,
    downvote: downVote
  };
}
