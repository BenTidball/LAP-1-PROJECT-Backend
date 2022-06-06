const request = require("supertest");
const app = require("../../app");
const testData = require("../../data/testpost.json");

describe('Save data reading', () => {
  test('should return json object containing post data', () => {
    // expect(testData["post-title"]).toBe("Test post title");
    request(app).get("/readPost").then(response => {
      // expect(response).toBe();
      // console.log(response);
      done();
    });
  });
});

