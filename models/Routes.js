const { model, Schema } = require("mongoose");

module.exports = model("routes", new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    name: { type: String, required: true },
    distance: { type: Number, required: true },
    duration: Number,
    pace: Number,
    calories: Number
}, {
    timestamps: false,
    versionKey: false
}));