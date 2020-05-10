const { model, Schema } = require("mongoose");

module.exports = model("posts", new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    body: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: true
}));