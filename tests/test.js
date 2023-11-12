const chai = require("chai");
const chaiHttp = require("chai-http");
const { app, server } = require("../app");

chai.use(chaiHttp);
chai.should();

// most of the tests are not implemented -- there is just an invocation of done() (the callback)
// test examples show how to do chai testing
// chai is configured to use the "should" syntax for assertions
// complete the tests -- functions that begin with "it"

// The test.js file tests the back end, by sending REST requests to it.
describe("People", () => {
  after(() => {
    server.close();
  });
  describe("post /api/v1/people", () => {
    it("should not create a people entry without a name", (done) => {
      chai
        .request(app)
        // cause a post request to be sent to the app for the URI specified (/api/v1/people)
          // can also do get/put/patch/delete
        .post("/api/v1/people")
        // specify body to be sent (if any)
        .send({ age: 10 })
        // retrieve resulting req and res
        .end((err, res) => {
          // result should have result code 400
          res.should.have.status(400);
          // body of result should equal JSON object described
          res.body.should.be.eql({ error: "Please enter a name." });
          done();
        });
    });
    it("should create a people entry with valid input", (done) => {
      // your code goes here
      chai
        .request(app)
        // post request to /api/v1/people
        .post("/api/v1/people")
        // specify body to be sent
        .send({ name: "Tomme", age: 12 })
        // retrieve resulting req and res
        .end((err, res) => {
          // result should have result code 201
          res.should.have.status(201);
          // body of result should equal JSON object described
          res.body.should.contain({ message: "A person record was added." });
          this.lastIndex = res.body.index;
          done();
        });
    });
  });
  describe("get /api/v1/people", () => {
    // console.log(this.lastIndex + 1);
    it(`should return an array of person entries of length ${this.lastIndex + 1}`, (done) => {
      // your code goes here
      chai
        .request(app)
        // get request to /api/v1/people
        .get("/api/v1/people")
        // specify body to be sent (if any)
          // no body to be sent
        // retrieve resulting req and res
        .end((err, res) => {
          // result should have result code 200
          res.should.have.status(200);
          // body of the result should equal JSON object described
          res.body.should.have.length(this.lastIndex + 1); // refractor?
          done();
        });
    });
  });
  describe("get /api/v1/people/:id", () => {
    it("should return the entry corresponding to the last person added.", (done) => {
      // your code goes here
      chai
        .request(app)
        // get request to /api/v1/people/:id
        .get(`/api/v1/people/${this.lastIndex}`) // refractor?
        // no body to be sent
        // retrieve resulting req and res
        .end((err, res) => {
          // result should have result code 200
          res.should.have.status(200);
          // body of the result should equal JSON object described
          res.body.name.should.be.eql("Tomme")
          done();
        })
      
    });
    it("should return an error if the index is >= the length of the array", (done) => {
      // your code goes here
      chai
        .request(app)
        // get request to /api/v1/people/:id where id >= length of array
        .get(`/api/v1/people/5`)
        // retrieve resulting req and res
        .end((err, res) => {
          // result should have result code 404
          res.should.have.status(404);
          done();
        })
    });
  });
});
