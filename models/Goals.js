const { model, Schema } = require("mongoose");

module.exports = model("goals", new Schema({
    name: { type: String, required: true },
    goalType: {type: String, enum: ["numberOfRuns", "minutesRan", "distanceRan"], required: true},
    target: { type: Number, required: true},
    actual: { type: Number},
    startDate: { type: Date },
    periodOfTime: { type: Number, required: true },
    status: { type: String, default: "Pending", enum: ["Pending", "In Progress", "Succeeded", "Failed"] },
}, {
    timestamps: true,
    versionKey: false
}))