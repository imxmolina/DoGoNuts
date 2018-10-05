const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const boxSchema = new Schema({
    boxname: { type: String, required: true },
    donutcount: [{type: Schema.Types.ObjectId, ref: "Donut"}]
});

const Box = mongoose.model("Box", boxSchema);

module.exports = Box;
