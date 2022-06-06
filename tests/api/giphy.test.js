const request = require("supertest");
const app = require("../../server/app");

describe('Can reach server route', () => {

    let testServer;
    beforeAll(() => {
      testServer = app.listen(6001, ()=>{
        console.log("Test server open on port 6001");
      })
    })

    afterAll((done) => {
        console.log('Ending test server');
        testServer.close(done);
    });

    test('should return 5 trending gifs',  (done) => {
        request(testServer).get('/gif')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            expect(res.body.length).toBe(5);
        });

        done();
    });


    test('should return a gif by ID', (done) => {
        request(testServer).get('/gif/21GmfgafQTNPL9oqD5')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            expect(res.body.length).toBe(1);
        });

        done();
    });


});
