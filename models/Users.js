const { model, Schema } = require("mongoose");

module.exports = model("users", new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    country: {type: String, required: false},
    state: {type: String, required: false},
    spotify: {type: String, required: false},
    friends: [Schema.Types.ObjectId],
}));