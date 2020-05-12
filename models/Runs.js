const { model, Schema } = require("mongoose");

module.exports = model("runs", new Schema({
    userID: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    day: { type: Date, required: true },
    routeID: { type: Schema.Types.ObjectId, required: true, ref: "routes" },
    avgPace: { type: Number, required: true },
    totalTime: { type: Number, required: true }
}, {
    timestamps: true,
    versionKey: true
}));