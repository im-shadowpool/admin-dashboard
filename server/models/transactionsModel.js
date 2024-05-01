import mongoose, { mongo } from "mongoose";

const transactionsSchema = new mongoose.Schema(
  {
    userId: String,
    cost: String,
    products: {
      type: [mongoose.Types.ObjectId],
      of: Number,
    },
  },
  { timestamps: true }
);

const Transactions = mongoose.model("Transactions", transactionsSchema);

export default Transactions;
