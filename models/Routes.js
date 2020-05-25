const { model, Schema } = require("mongoose");

module.exports = model("routes", new Schema({
    user: { type: Schema.ObjectId, required: true, ref: "users" },
    name: { type: String, required: true },
    distance: { type: Number, required: true },
    duration: { type: Number, default: 0 },
    pace: { type: Number, default: 0 },
    calories: { type: Number, default: 0 },
    geometry: {
        type: { type: String, default: "LineString"},
        coordinates: [{
            longitude : { type: Number, default: 0},
            latitude : { type: Number, default: 0}
        }]
    },
}, {
    timestamps: false,
    versionKey: false
}));