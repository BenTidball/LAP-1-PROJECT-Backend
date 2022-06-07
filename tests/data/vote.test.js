const request = require("supertest");
let basePath = `http://localhost:5000`;

describe('Test vote part', () => {
  
  describe('Test vote part', () => {
    const topic = `cats`;
    it('Test if data set exist', async () => {
        const response = await request(basePath).get(`/post/topic/${topic}`);
        let returnObject = JSON.parse(response.text);
        expect(returnObject).not.toBeNull();
    });

    it('Test if number of post > 0', async () => {
        const response = await request(basePath).get(`/post/topic/${topic}`);
        let returnObject = JSON.parse(response.text);
        let listOfData = returnObject.data;
        expect(listOfData.length).toBeGreaterThan(0);
    });

    it('Test if first post is not null', async () => {
        const response = await request(basePath).get(`/post/topic/${topic}`);
        let returnObject = JSON.parse(response.text);
        let listOfData = returnObject.data;
        let firstRow = listOfData[0];
        expect(firstRow).not.toBeNull();
    });

    it('Test if post has vote attribute', async () => {
        const response = await request(basePath).get(`/post/topic/${topic}`);
        let returnObject = JSON.parse(response.text);
        let listOfData = returnObject.data;
        let firstRow = listOfData[0];
        expect(firstRow[`post-vote`]).not.toBeNull();
    });

    it('Test if post has up vote attribute', async () => {
        const response = await request(basePath).get(`/post/topic/${topic}`);
        let returnObject = JSON.parse(response.text);
        let listOfData = returnObject.data;
        let firstRow = listOfData[0];
        let voteAttribute = firstRow[`post-vote`];
        expect(voteAttribute.upvote).not.toBeNull();
    });

    it('Test if post has down vote attribute', async () => {
        const response = await request(basePath).get(`/post/topic/${topic}`);
        let returnObject = JSON.parse(response.text);
        let listOfData = returnObject.data;
        let firstRow = listOfData[0];
        let voteAttribute = firstRow[`post-vote`];
        expect(voteAttribute.downvote).not.toBeNull();
    });

    it('Test submit a vote with null attribute', async () => {
      const voteData = {
        postId: null,
        replyId: null,
        updownvote: null
      };
      await request(basePath)
        .post(`/post/vote`)
        .send(voteData)
        .expect(400);
    });

    it('Test submit a up vote to a post', async () => {
      const beforeUpvote = await request(basePath).get(`/post/topic/${topic}`);
      let beforeObject = getPostVoteByPosition(beforeUpvote, 0);
      const voteData = {
        postId: beforeObject.postId,
        replyId: beforeObject.replyId,
        updownvote: "upvote"
      };
      await request(basePath).post(`/post/vote`).send(voteData).expect(200);
      const afterUpvote = await request(basePath).get(`/post/topic/${topic}`);
      let afterObject = getPostVoteByPosition(afterUpvote, 0);
      expect(beforeObject.upvote).toEqual(afterObject.upvote - 1);
    });

    it('Test submit a down vote to a post', async () => {
      const beforeUpvote = await request(basePath).get(`/post/topic/${topic}`);
      let beforeObject = getPostVoteByPosition(beforeUpvote, 0);
      const voteData = {
        postId: beforeObject.postId,
        replyId: beforeObject.replyId,
        updownvote: "downvote"
      };
      await request(basePath).post(`/post/vote`).send(voteData).expect(200);
      const afterUpvote = await request(basePath).get(`/post/topic/${topic}`);
      let afterObject = getPostVoteByPosition(afterUpvote, 0);
      expect(beforeObject.downvote).toEqual(afterObject.downvote - 1);
    });
  });
});

function getPostVoteByPosition(responseObject, pos) {
  let returnObject = JSON.parse(responseObject.text);
  let listOfData = returnObject.data;
  let row = listOfData[pos];
  let voteAttribute = row[`post-vote`];
  let postId = row[`post-ID`];
  let upVote = voteAttribute.upvote;
  let downVote = voteAttribute.downvote;
  return {
    postId: postId,
    replyId: null,
    upvote: upVote,
    downvote: downVote
  };
}
