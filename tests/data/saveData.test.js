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
  
  //   test('should return testPost.json', async (done) => {
  //     const res = await request(testServer).get('/test/readPost')
  //     .set("accept", "application/json");
  //     expect(res).toEqual();
  //     done();
  //   });
  // });
  
});

// describe('Write to file', () => {
  
//   let testServer;
//   beforeAll(() => {
//     testServer = app.listen(6000, ()=>{
//       console.log("Test server open on port 6000");
//     })
//   })

//   afterAll((done) => {
//     console.log('Ending test server');
//     testServer.close(done);
//   });

//   test('should change id to 3', () => {
//     request(testServer).post('/test/writePost').expect(request).tobe();
//     done();
//   });
// });
