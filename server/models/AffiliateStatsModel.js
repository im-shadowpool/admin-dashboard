import mongoose from "mongoose";

const AffiliateStatsSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  affiliateSales: {
    type: [mongoose.Types.ObjectId],
    ref: "Transactions"
  },

}, { timestamps: true });

const AffiliateStats = mongoose.model("AffiliateStats", AffiliateStatsSchema); 
export default AffiliateStats;