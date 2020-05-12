const { model, Schema } = require("mongoose");

module.exports = model("routes", new Schema({
    userID: { type: String, required: true },
    routeName: { type: String, required: true },
    length: { type: Number, required: true },
    duration: { type: Number, required: true }
}, {
    timestamps: true,
    versionKey: true
}));