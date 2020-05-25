const { model, Schema } = require("mongoose");

module.exports = model("runs", new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    timestamp: { type: Date, required: true },
    route: { type: Schema.Types.ObjectId, required: false, ref: "routes" },
    avgPace: { type: Number, default: 0 },
    totalTime: { type: Number, default: 0 },
    distanceRan: { type: Number, default: 0 },
    geometry: [{
        type: { type: String, default: "LineString"},
        coordinates: {
            longitude : { type: Number, default: 0},
            latitude : { type: Number, default: 0}
        }
    }],
}, {
    timestamps: false,
    versionKey: false
}));