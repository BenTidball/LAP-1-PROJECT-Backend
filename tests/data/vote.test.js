const request = require("supertest");
let basePath = `http://localhost:5000`;

describe('Test vote part', () => {

  test('Expect vote API exist', (done) => {
    request(basePath).post('/post/vote').expect(200, done);
  });
  
  describe('Test vote part', () => {
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

    it('Test if post has vote attribute', async () => {
        const data = await request(basePath).get(`/post/topic/${topic}`);
        let returnObject = JSON.parse(data.text);
        let listOfData = returnObject.data;
        let firstRow = listOfData[0];
        expect(firstRow[`post-vote`]).not.toBeNull();
    });

    it('Test if post has up vote attribute', async () => {
        const data = await request(basePath).get(`/post/topic/${topic}`);
        let returnObject = JSON.parse(data.text);
        let listOfData = returnObject.data;
        let firstRow = listOfData[0];
        let voteAttribute = firstRow[`post-vote`];
        expect(voteAttribute.upvote).not.toBeNull();
    });

    it('Test if post has down vote attribute', async () => {
        const data = await request(basePath).get(`/post/topic/${topic}`);
        let returnObject = JSON.parse(data.text);
        let listOfData = returnObject.data;
        let firstRow = listOfData[0];
        let voteAttribute = firstRow[`post-vote`];
        expect(voteAttribute.downvote).not.toBeNull();
    });

    //expect(data.text).toEqual(JSON.stringify(catsData));
  });
});
