const request = require("supertest");
let basePath = `http://localhost:5000`;
const cats = require('../../data/cats.json')

describe('Test comment part', () => {
  
  describe('Test comment part', () => {
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

    it('Test if post has comment attribute', async () => {
        const response = await request(basePath).get(`/post/topic/${topic}`);
        let object = getPostFirstObject(response, 0);
        expect(object[`post-comments`]).not.toBeNull();
    });

    it('Test if post comment is not null', async () => {
        const response = await request(basePath).get(`/post/topic/${topic}`);
        let object = getPostCommentsByPosition(response, 0);
        expect(object.comments).not.toBeNull();
    });

    it('Test if post has > 1 comment', async () => {
      const response = await request(basePath).get(`/post/topic/${topic}`);
      let object = getPostCommentsByPosition(response, 0);
      expect(object.comments.length).toBeGreaterThan(0);
  });

    it('Test submit a comment with null attribute', async () => {
      const commentData = {
        postId: null,
        replyId: null,
        comment: null
      };
      await request(basePath)
        .post(`/post/comment`)
        .send(commentData)
        .expect(400);
    });

    it('Test submit a comment to a post, checking number of comment', async () => {
      const beforeSubmitComment = await request(basePath).get(`/post/topic/${topic}`);
      let beforeObject = getPostCommentsByPosition(beforeSubmitComment, 0);
      const commentData = {
        postId: beforeObject.postId,
        replyId: beforeObject.replyId,
        comment: "Put in new comment"
      };
      await request(basePath).post(`/post/comment`).send(commentData).expect(200);
      const afterSubmitComment = await request(basePath).get(`/post/topic/${topic}`);
      let afterObject = getPostCommentsByPosition(afterSubmitComment, 0);
      expect(beforeObject.comments.length).toEqual(afterObject.comments.length + 1);
    });

    it('Test submit a comment to a post, checking the content', async () => {
      const beforeSubmitComment = await request(basePath).get(`/post/topic/${topic}`);
      let beforeObject = getPostCommentsByPosition(beforeSubmitComment, 0);
      const commentData = {
        postId: beforeObject.postId,
        replyId: beforeObject.replyId,
        comment: "Put in another new comment"
      };
      await request(basePath).post(`/post/comment`).send(commentData).expect(200);
      const afterSubmitComment = await request(basePath).get(`/post/topic/${topic}`);
      let afterObject = getPostCommentsByPosition(afterSubmitComment, 0);
      expect((afterObject.comments[afterObject.comments.length - 1])[`reply-body`]).toEqual("Put in another new comment");
    });

  });

  // describe('Comment saved to json file', () => {
  //   test('should have a comment appended to post', () => {
  //     const commentData = {
  //       comment: {commentBody: "reply test"},
  //       category: 'cats',
  //       post: {"post-id": 9}
  //     }
  //     request(basePath).post(`/post/comment`).send(commentData);
      
  //   });
  // });
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

function getPostCommentsByPosition(responseObject, pos) {
  let object = getPostFirstObject(responseObject, pos);
  let commentAttribute = object[`post-comments`];
  let postId = object[`post-id`];
  let listOfComments = commentAttribute;
  return {
    postId: postId,
    replyId: null,
    comments: listOfComments
  };
}
