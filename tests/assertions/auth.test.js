process.env.NODE_ENV = "testing";

const chai = require("chai");
const server = require("../../server");
const should = require("chai").should();
const chaiHttp = require("chai-http");

const { register, login } = require("../data/auth.json");

chai.use(chaiHttp);

describe("POST /api/v1/users", () => {
    it("It should return a 201 status with the new user object", done => {
        chai.request(server)
        .post("/api/users")
        .send(register.good)
        .end((err, res) => {
            if(err) throw err;

            res.should.have.property("status", 201);

            res.body.should.be.a("object");

            res.body.should.have.property("name");
            res.body.should.have.property("email");
            res.body.should.have.property("password");

            res.body.name.should.be.a("object");
            res.body.email.should.be.a("string");
            res.body.password.should.be.a("string");

            res.body.name.first.should.be.a("string");
            res.body.name.last.should.be.a("string");

            done();
        });
    });
});