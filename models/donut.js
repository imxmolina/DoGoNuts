var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var donutSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true }
});

var Donut = mongoose.model("Donut", donutSchema);

module.exports = Donut;
