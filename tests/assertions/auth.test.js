process.env.NODE_ENV = "3002";

const chai = require("chai");
const server = require("../../server");
const should = require("chai").should();
const chaiHttp = require("chai-http");

const { register, login } = require("../data/auth.json");

chai.use(chaiHttp);

let auth = '';

// Create New User
describe("POST /api/v1/users", () => {
    it("It should return a 201 status with the new user's token", done => {
        let user = {
            name: "Gerald Smith",
            password: "password",
            email: "m89@michaeldsilva.com"
        }
        chai.request(server)
        .post("/api/v1/users")
        .send(user)
        .end((err, res) => {
            if(err) throw err;

            res.should.have.property("status", 201);

            res.body.should.be.a("string");

            done();

            return auth = res.body;
        });
    });
});

// Try creating user with email just used
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

            res.body.should.equal("User already exists");

            done();
        });
    });
});

// Update new user
describe("UPDATE /api/v1/users", () => {
    it("It should return a 200 status with a string saying the user has been updates", done => {
        console.log("Auth:" + auth)
        let userData = {
            name: "Greg Smith",
            Country: "France"
        }
        chai.request(server)
        .put("/api/v1/users")
        .set('Authorization', auth)
        .send(userData)
        .end((err, res) => {
            if(err) throw err;

            res.should.have.property("status", 200);

            res.body.should.be.a("string");

            res.body.should.equal("User updated.");

            done();

        });
    });
});

// Delete new user
describe("DELETE /api/v1/users", () => {
    it("It should return a 200 status with a string saying the user has been deleted", done => {
        console.log("Auth:" + auth)
        chai.request(server)
        .delete("/api/v1/users")
        .set('Authorization', auth)
        .end((err, res) => {
            if(err) throw err;

            res.should.have.property("status", 200);

            res.body.should.be.a("string");

            res.body.should.equal("User deleted.");

            done();

        });
    });
});