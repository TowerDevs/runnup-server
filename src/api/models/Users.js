const { model, Schema } = require("mongoose");

const friendSchema = require('./Friends').schema;

module.exports = model("users", new Schema({
    name: {
        first: {type: String, required: true},
        last: {type: String, required: true}
    },
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    country: String,
    state: String,
    spotify: String,
    friendRequests: [{type: Schema.Types.ObjectId, ref: 'users'}],
    blockedUsers: [{type: Schema.Types.ObjectId, ref: 'users'}],
    friends: [friendSchema],
    runStats: {
        kilometersRan: {type: Number},
        minutesRan: {type: Number},
        runsCompleted: {type: Number}
    }
}));