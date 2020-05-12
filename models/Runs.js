const { model, Schema } = require("mongoose");

module.exports = model("runs", new Schema({
    userID: { type: String, required: true },
    day: { type: Date, required: true },
    routeID: {type: String, required: true},
    avgPace: { type: Number, required: true },
    totalTime: { type: Number, required: true }
}, {
    timestamps: true,
    versionKey: true
}));