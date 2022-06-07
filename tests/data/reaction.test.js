const request = require("supertest");
let basePath = `http://localhost:5000`;

describe('Test reaction part', () => {
  
  describe('Test reaction part', () => {
    const topic = `cats`;
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

    it('Test if post has reaction attribute', async () => {
        const response = await request(basePath).get(`/post/topic/${topic}`);
        let object = getPostFirstObject(response, 0);
        expect(object[`post-reactions`]).not.toBeNull();
    });

    it('Test if post has reaction1 attribute', async () => {
        const response = await request(basePath).get(`/post/topic/${topic}`);
        let object = getPostReactionsByPosition(response, 0);
        expect(object.reaction1).not.toBeNull();
    });

    it('Test if post has reaction2 attribute', async () => {
        const response = await request(basePath).get(`/post/topic/${topic}`);
        let object = getPostReactionsByPosition(response, 0);
        expect(object.reaction2).not.toBeNull();
    });

    it('Test if post has reaction3 attribute', async () => {
        const response = await request(basePath).get(`/post/topic/${topic}`);
        let object = getPostReactionsByPosition(response, 0);
        expect(object.reaction3).not.toBeNull();
    });

    it('Test submit a reaction with null attribute', async () => {
      const reactionData = {
        postId: null,
        replyId: null,
        reaction1: null,
        reaction2: null,
        reaction3: null
      };
      await request(basePath)
        .post(`/post/reaction`)
        .send(reactionData)
        .expect(400);
    });

    it('Test submit a reaction1 to a post', async () => {
      const beforeSubmitReaction = await request(basePath).get(`/post/topic/${topic}`);
      let beforeObject = getPostReactionsByPosition(beforeSubmitReaction, 0);
      const reactionData = {
        postId: beforeObject.postId,
        replyId: beforeObject.replyId,
        reaction: "reaction1"
      };
      await request(basePath).post(`/post/reaction`).send(reactionData).expect(200);
      const afterSubmitReaction = await request(basePath).get(`/post/topic/${topic}`);
      let afterObject = getPostReactionsByPosition(afterSubmitReaction, 0);
      expect(beforeObject.reaction1).toEqual(afterObject.reaction1 - 1);
    });

    it('Test submit a reaction2 to a post', async () => {
        const beforeSubmitReaction = await request(basePath).get(`/post/topic/${topic}`);
        let beforeObject = getPostReactionsByPosition(beforeSubmitReaction, 0);
        const reactionData = {
          postId: beforeObject.postId,
          replyId: beforeObject.replyId,
          reaction: "reaction2"
        };
        await request(basePath).post(`/post/reaction`).send(reactionData).expect(200);
        const afterSubmitReaction = await request(basePath).get(`/post/topic/${topic}`);
        let afterObject = getPostReactionsByPosition(afterSubmitReaction, 0);
        expect(beforeObject.reaction2).toEqual(afterObject.reaction2 - 1);
      });

    it('Test submit a reaction3 to a post', async () => {
    const beforeSubmitReaction = await request(basePath).get(`/post/topic/${topic}`);
    let beforeObject = getPostReactionsByPosition(beforeSubmitReaction, 0);
    const reactionData = {
        postId: beforeObject.postId,
        replyId: beforeObject.replyId,
        reaction: "reaction3"
    };
    await request(basePath).post(`/post/reaction`).send(reactionData).expect(200);
    const afterSubmitReaction = await request(basePath).get(`/post/topic/${topic}`);
    let afterObject = getPostReactionsByPosition(afterSubmitReaction, 0);
    expect(beforeObject.reaction3).toEqual(afterObject.reaction3 - 1);
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

function getPostReactionsByPosition(responseObject, pos) {
  let object = getPostFirstObject(responseObject, pos);
  let reactionAttribute = object[`post-reactions`];
  let postId = object[`post-ID`];
  let reaction1 = reactionAttribute.reaction1;
  let reaction2 = reactionAttribute.reaction2;
  let reaction3 = reactionAttribute.reaction3;
  return {
    postId: postId,
    replyId: null,
    reaction1: reaction1,
    reaction2: reaction2,
    reaction3: reaction3
  };
}
