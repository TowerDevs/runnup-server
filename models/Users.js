const { model, Schema } = require("mongoose");

var mate = new Schema({
    friend: { type: Schema.Types.ObjectId, ref: "users" },
    email: { type: String, required: true },
    status: { type: String, required: true }
})

module.exports = model("users", new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    country: {type: String, required: false},
    state: {type: String, required: false},
    spotify: {type: String, required: false},
   // friends: [{type: Schema.ObjectId, ref: 'Friend'}],
   friends: [mate]
}));