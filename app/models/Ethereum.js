const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ethereumSchema = new Schema({
  price: {
    type: Number,
    required: true,
    default:0
  },
});

module.exports = mongoose.model("Ethereum", ethereumSchema);
