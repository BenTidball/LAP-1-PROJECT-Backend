const request = require("supertest");
let basePath = `http://localhost:5000`;

describe('Test reaction part', () => {

  test('Expect reaction API exist', (done) => {
    request(basePath).post('/post/reaction').expect(200, done);
  });
  
  describe('Test reaction part', () => {
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

    it('Test if post has reaction attribute', async () => {
        const data = await request(basePath).get(`/post/topic/${topic}`);
        let returnObject = JSON.parse(data.text);
        let listOfData = returnObject.data;
        let firstRow = listOfData[0];
        expect(firstRow[`post-reactions`]).not.toBeNull();
    });

    it('Test if post has reacion1', async () => {
        const data = await request(basePath).get(`/post/topic/${topic}`);
        let returnObject = JSON.parse(data.text);
        let listOfData = returnObject.data;
        let firstRow = listOfData[0];
        let reactionAttribute = firstRow[`post-reactions`];
        expect(reactionAttribute.reacion1).not.toBeNull();
    });

    it('Test if post has reacion2', async () => {
        const data = await request(basePath).get(`/post/topic/${topic}`);
        let returnObject = JSON.parse(data.text);
        let listOfData = returnObject.data;
        let firstRow = listOfData[0];
        let reactionAttribute = firstRow[`post-reactions`];
        expect(reactionAttribute.reacion2).not.toBeNull();
    });

    it('Test if post has reacion3', async () => {
        const data = await request(basePath).get(`/post/topic/${topic}`);
        let returnObject = JSON.parse(data.text);
        let listOfData = returnObject.data;
        let firstRow = listOfData[0];
        let reactionAttribute = firstRow[`post-reactions`];
        expect(reactionAttribute.reacion3).not.toBeNull();
    });

    //expect(data.text).toEqual(JSON.stringify(catsData));
  });
});
