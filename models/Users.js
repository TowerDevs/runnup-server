const { model, Schema } = require("mongoose");

const friendSchema = require('../models/Friends').schema;

/**
 * 
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *          - country
 *          - state
 *          - 
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *        example:
 *           name: Alexander
 *           email: fake@email.com
 */

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