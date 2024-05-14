import User from "../models/userModel.js";
import AffiliateStats from "../models/AffiliateStatsModel.js";
import Transaction from "../models/transactionsModel.js";
import mongoose, { mongo } from "mongoose";

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAffiliates = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const userWithAffiliates = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliatesStats",
        },
      },
      { $unwind: "$affiliatesStats" },
    ]);

    const saleTransactions = await Promise.all(
      userWithAffiliates[0].affiliatesStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );

    const filteredTransactions = saleTransactions.filter(
      (transactionId) => transactionId !== null
    );

    res.status(200).json({
      user: userWithAffiliates[0],
      sales: filteredTransactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
