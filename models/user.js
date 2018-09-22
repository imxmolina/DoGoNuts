const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    uid: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

module.exports = User;