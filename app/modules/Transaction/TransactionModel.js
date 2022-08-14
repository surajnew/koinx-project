const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const root = "/models";

const transactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: String,
      index: true,
    },
    blockNumber: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    value: {
      type: String,
    },
    hash: {
      type: String,
    },
    blockHash: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
// userSchema.set('toObject', { getters: true });
// userSchema.set('toJSON', { getters: true });
module.exports = mongoose.model("Transaction", transactionSchema);
