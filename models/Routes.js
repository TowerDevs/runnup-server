const { model, Schema } = require("mongoose");

module.exports = model("routes", new Schema({
    userID: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    routeName: { type: String, required: true },
    length: { type: Number, required: true },
    duration: { type: Number, required: true }
}, {
    timestamps: true,
    versionKey: true
}));