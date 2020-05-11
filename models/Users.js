const { model, Schema } = require("mongoose");

module.exports = model("users", new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    region: {type: String, required: true},
    spotifyID: {type: String, required: false},
    friends: [Schema.Types.ObjectId],
}));