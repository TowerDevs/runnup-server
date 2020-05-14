process.env.NODE_ENV = "3002";

const chai = require("chai");
const server = require("../../server");
const should = require("chai").should();
const chaiHttp = require("chai-http");

const { register, login } = require("../data/auth.json");

chai.use(chaiHttp);

let auth1 = '';
let auth2 = '';

// Login user1
describe("POST /api/v1/users/access-token", () => {
    it("It should return a 201 status with the user's token", done => {
        let userData = {
            email: "m3@michaeldsilva.com",
            password: "password",
        }
        chai.request(server)
        .post("/api/v1/users/access-token")
        .send(userData)
        .end((err, res) => {
            if(err) throw err;

            res.should.have.property("status", 201);

            res.body.should.be.a("string");

            done();

            return auth1 = res.body;
        });
    });
});

// Login user2
describe("POST /api/v1/users/access-token", () => {
    it("It should return a 201 status with the user's token", done => {
        let userData = {
            email: "m4@michaeldsilva.com",
            password: "password",
        }
        chai.request(server)
        .post("/api/v1/users/access-token")
        .send(userData)
        .end((err, res) => {
            if(err) throw err;

            res.should.have.property("status", 201);

            res.body.should.be.a("string");

            done();

            return auth2 = res.body;
        });
    });
});

// user1 sends friend request to user2
describe("PUT /api/v1/friends", () => {
    it("It should return a 200 status with a message saying the friend request was sent", done => {
        let friend = {
            email: "m4@michaeldsilva.com"
        }
        chai.request(server)
        .put("/api/v1/friends")
        .set('Authorization', auth1)
        .send(friend)
        .end((err, res) => {
            if(err) throw err;

            res.should.have.property("status", 200);

            res.body.should.be.a("string");

            res.body.should.equal("Friend request sent.");

            console.log(res.body);

            done();

        });
    });
});

// user2 responds to user1's friend request
describe("PUT /api/v1/friends/respond", () => {
    it("It should return a 200 status with a message saying the status of the request", done => {
        let decision = {
            requestor: "5ebb525cb9d1723b64896514",
            response: "Reject"
        }        
        chai.request(server)
        .put("/api/v1/friends/respond")
        .set('Authorization', auth2)
        .send(decision)
        .end((err, res) => {
            if(err) throw err;

            res.should.have.property("status", 200);

            res.body.should.be.a("string");

            res.body.should.equal("Friend status set to rejected.");

            console.log("Reject test: " + res.body);

            done();

        });
    });
});