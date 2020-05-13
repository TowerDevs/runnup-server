const { model, Schema } = require("mongoose");

module.exports = model("friends", new Schema({
    friend: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    status: { type: String, required: true }
}))