const { model, Schema } = require("mongoose");

const friendSchema = require('../models/Friends').schema;

module.exports = model("users", new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    country: {type: String, required: false},
    state: {type: String, required: false},
    spotify: {type: String, required: false},
    friendRequests: [{type: Schema.ObjectId, ref: 'users'}],
    friends: [friendSchema]
}));