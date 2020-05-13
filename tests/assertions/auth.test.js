process.env.NODE_ENV = "3002";

const chai = require("chai");
const server = require("../../server");
const should = require("chai").should();
const chaiHttp = require("chai-http");

const { register, login } = require("../data/auth.json");

chai.use(chaiHttp);

describe("POST /api/v1/users", () => {
    it("It should return a 201 status with the new user's token", done => {
        let user = {
            name: "Gerald Smith",
            password: "password",
            email: "m7@michaeldsilva.com"
        }
        chai.request(server)
        .post("/api/v1/users")
        .send(user)
        .end((err, res) => {
            if(err) throw err;

            res.should.have.property("status", 201);

            res.body.should.be.a("string");

            done();
        });
    });
});

describe("POST /api/v1/users", () => {
    it("It should return a 403 status with string saying the user alredy exists", done => {
        let user = {
            name: "Gerald Smith",
            password: "password",
            email: "m2@michaeldsilva.com"
        }
        chai.request(server)
        .post("/api/v1/users")
        .send(user)
        .end((err, res) => {
            if(err) throw err;

            res.should.have.property("status", 403);

            res.body.should.be.a("string");

            res.body.should.equal("User already exists")

            done();
        });
    });
});