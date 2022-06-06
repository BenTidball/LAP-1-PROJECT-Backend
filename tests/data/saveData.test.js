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
    request(testServer).get('/test/readPost').expect(200, done);
  });
  
  // describe('return json post data', () => {
   
  //   test('should return a status of 200', (done) => {
  //     request(testServer).get('/test/readPost').expect(200, done);
  //   });

  // });

});
