const { model, Schema } = require("mongoose");

module.exports = model("runs", new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    timestamp: { type: Date, required: true },
    route: { type: Schema.Types.ObjectId, required: true, ref: "routes" },
    avgPace: { type: Number, default: 0 },
    totalTime: { type: Number, default: 0 },
    distanceRan: { type: Number, default: 0 }
}, {
    timestamps: false,
    versionKey: false
}));