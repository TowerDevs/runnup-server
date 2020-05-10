const { model, Schema } = require("mongoose");

module.exports = model("users", new Schema({
    name: {},
    email: {},
    password: {},
}));