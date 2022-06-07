const request = require("supertest");
const app = require("../../server/app");
const testData = require("../../data/testpost.json");

describe('Can reach server route', () => {
  let testServer;

  beforeAll(() => {
    testServer = app.listen(6000, ()=>{
      console.log("Test server open on port 6000");
    })
  })

  afterAll((done) => {
    console.log('Ending test server');
    testServer.close(done);
  });

  test('should return a status of 200', (done) => {
    request(testServer).get('/').expect(200, done);
  });

  test('should return a status of 200', (done) => {
    request(testServer).get('/get/readPost').expect(200, done);
  });

  //read from json
  describe('return json post data', (done) => {
    it('should return testPost.json', async () => {
      const data = await request(`http://localhost:6000`)
        .get('/get/readPost');
      expect(data.text).toEqual(JSON.stringify(testData), done);
    });

  });

  //write to json 
  describe('save post as json data', (done) => {
    it('should respond with status 200', async () => {
      const data = {
        postTitle: "Cat 2",
        postBody: "This is a Cat 2",
      };

      const res = await request(testServer).post('/post/post').send(data)
      expect(res.statusCode).toBe(200);
    })

    test('responds with json', async function() {
      const data = {
        postTitle: "Cat 2",
        postBody: "This is a Cat 2",
      };

      const response = await request(testServer)
        .post('/post/post')
        .set('Accept', 'application/json')
        .send(data)

        expect(response).toEqual("Cat 2");
    });

  })

});

