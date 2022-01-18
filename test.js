const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("./index");
const should = chai.should();
chai.use(chaiHttp);

describe("Testing GET on /list ", () => {
  it("It should list tasks from the list including a way to filter for in-progress / completed ", (done) => {
    chai
      .request(app)
      .get("/list")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("result");
        res.body.should.have.property("filter");
        done();
      });
  });
});

describe("Testing POST on /add ", () => {
  it("It should add a new task to the To-Do-List and return the created task", (done) => {
    const task = {
      name: "Front-end Task",
      status: "in-progress",
    };

    chai
      .request(app)
      .post("/add")
      .send(task)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("_id");
        res.body.should.have.property("name");
        res.body.should.have.property("status");
        done();
      });
  });
});

describe("Testing DELETE on /delete/taskId ", () => {
  it("It should delete an existing task's status and name ", (done) => {
    const id = "61e2e53d734f4457ec1ecd40";
    chai
      .request(app)
      .delete(`/delete/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("n");
        res.body.should.have.property("nModified");
        res.body.should.have.property("ok");
        done();
      });
  });
});

describe("Testing PUT on /edit/:taskId ", () => {
  it("It should edit an existing task's status and name ", (done) => {
    const id = "61e2e53d734f4457ec1ecd40";

    const task = {
      name: "Back-end Task",
      status: "completed",
    };
    chai
      .request(app)
      .put(`/edit/${id}`)
      .send(task)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("_id");
        res.body.should.have.property("name");
        res.body.should.have.property("status");
        done();
      });
  });
});
