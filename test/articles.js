let mongoose = require("mongoose");
let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../server");
let should = chai.should();
const { expect } = chai;
chai.use(chaiHttp);

describe("*********** ARTICLES ***********", () => {
  describe("/GET Request to get all articles", () => {
    it("Should get an array of articles", (done) => {
      chai
        .request(app)
        .get("/api/articles")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    }).timeout(5000);
  });

  describe("/POST Request should add a new article", () => {
    it("Should add a new article called Mocha Article", (done) => {
      const article = {
        title: "Mocha Article",
        author: "Mocha Article Author",
        date: "2020-05-29T03:48:57.605+00:00",
        results: "Mocha is great",
        url: "https://www.mocha.com",
        status: { state: "SUBMITTED" },
        type: "TDD",
      };
      chai
        .request(app)
        .post("/api/articles")
        .send(article)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a.property("_id");
          res.body.should.be.a.property("title");
          res.body.should.be.a.property("author");
          res.body.should.be.a.property("date");
          res.body.should.be.a.property("results");
          res.body.should.be.a.property("url");
          res.body.should.be.a.property("status");
          res.body.should.be.a.property("type");
          id = res.body._id;
          done();
        });
    });
  });

  describe("/GET Request should return an article", () => {
    it("Should return article called Mocha Article", (done) => {
      chai
        .request(app)
        .get("/api/articles/" + id)
        .end((err, res) => {
          res.body.should.be.a.property("_id");
          res.body.should.be.a.property("title");
          res.body.should.be.a.property("author");
          res.body._id.should.equal(id);
          done();
        });
    });
  });

  describe("/PATCH Request should update an article", () => {
    it("Should change author of Mocha Article but return origial author", (done) => {
      const patcharticle = {
        author: "New Author",
      };
      chai
        .request(app)
        .put("/api/articles/" + id)
        .send(patcharticle)
        .end((err, res) => {
          res.body.should.be.a.property("_id");
          res.body.should.be.a.property("title");
          res.body.should.be.a.property("author");
          res.body.author.should.equal("Mocha Article Author");
          done();
        });
    });
  });

  describe("/DELETE Request should remove an article", () => {
    it("Should remove article called Mocha Article", (done) => {
      chai
        .request(app)
        .delete("/api/articles/" + id)
        .end((err, res) => {
          res.body.should.be.a.property("_id");
          res.body.should.be.a.property("title");
          res.body.should.be.a.property("author");
          res.body._id.should.equal(id);
          done();
        });
    });
  });
});

after(() => {
  app.server.close(() => {
    app.mongoose.connection.close();
  });
});
