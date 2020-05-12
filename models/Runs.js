const { model, Schema } = require("mongoose");

module.exports = model("runs", new Schema({
    runID: { type: String, required: true },
    userID: { type: String, required: true },
    day: { type: Date, required: true },
    userID: { type: Schema.Types.ObjectId, required: true, ref: "routes" },
    avgPace: { type: Number, required: true },
    totalTime: { type: Number, required: true }
}, {
    timestamps: true,
    versionKey: true
}));