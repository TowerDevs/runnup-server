const { model, Schema } = require("mongoose");

module.exports = model("routes", new Schema({
    user: { type: Schema.ObjectId, required: true, ref: "users" },
    name: { type: String, required: true },
    distance: { type: Number, required: true },
    duration: { type: Number, required: false },
    pace: { type: Number, required: false },
    calories: {type: Number, required: false }
}));