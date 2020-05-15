const { model, Schema } = require("mongoose");

module.exports = model("goals", new Schema({
    name: { type: String, required: true },
    numberOfRuns: { type: Number},
    minutesRan: { type: Number},
    distanceRan: { type: Number},
    periodOfTime: { type: Number, required: true },
    status: { type: String, default: "Pending", enum: ["Pending", "In Progress", "Completed"] }
}, {
    timestamps: false,
    versionKey: false
}))