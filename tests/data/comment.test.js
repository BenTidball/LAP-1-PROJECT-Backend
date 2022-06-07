const request = require("supertest");
let basePath = `http://localhost:5000`;
const cats = require('../../data/cats.json')

describe('Test emoji part', () => {

  test('Expect comment API exist', (done) => {
    request(basePath).post('/post/comment').expect(200, done);
  });
  
  describe('Test comment part', () => {
    const topic = `cats`;
    it('Test if data set exist', async () => {
        const data = await request(basePath).get(`/post/topic/${topic}`);
        let returnObject = JSON.parse(data.text);
        expect(returnObject).not.toBeNull();
    });

    it('Test if number of post > 0', async () => {
        const data = await request(basePath).get(`/post/topic/${topic}`);
        let returnObject = JSON.parse(data.text);
        let listOfData = returnObject.data;
        expect(listOfData.length).toBeGreaterThan(0);
    });

    it('Test if first post is not null', async () => {
        const data = await request(basePath).get(`/post/topic/${topic}`);
        let returnObject = JSON.parse(data.text);
        let listOfData = returnObject.data;
        let firstRow = listOfData[0];
        expect(firstRow).not.toBeNull();
    });

    it('Test if post has comment attribute', async () => {
        const data = await request(basePath).get(`/post/topic/${topic}`);
        let returnObject = JSON.parse(data.text);
        let listOfData = returnObject.data;
        let firstRow = listOfData[0];
        expect(firstRow[`post-comment`]).not.toBeNull();
    });

    //expect(data.text).toEqual(JSON.stringify(catsData));
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
