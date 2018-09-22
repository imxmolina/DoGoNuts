const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const boxSchema = new Schema({
    boxname: { type: String, required: true },
    donutcount: [
        {
            id: { type: Schema.Types.ObjectId, required: true },
            donutname: { type: String, required: true },
            howmany: { type: Number, required: true }
        }
    ]
});

const Box = mongoose.model("Box", boxSchema);

module.exports = Box;