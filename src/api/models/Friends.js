const { model, Schema } = require("mongoose");

module.exports = model("friends", new Schema({
    friend: { type: Schema.Types.ObjectId, ref: "users" },
    email: { type: String, required: true },
    status: { type: String, default: "Pending", enum: ["Pending", "Accepted", "Rejected", "Blocked"] }
}, {
    timestamps: false,
    versionKey: false
}))