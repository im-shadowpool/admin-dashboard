import mongoose from "mongoose";

const productStatSchema = new mongoose.Schema({
  productId: String,
  yearlySalesTotal: Number,
  yearlyTotalSoldUnits: Number,
  monthlyData: [
    {
      month: String,
      totalSales: Number,
      totalUnits: Number,
    },
  ],
  dailyData: [
    {
      date: String,
      totalSales: Number,
      totalUnits: Number,
    },
  ],
});

const ProductStats = mongoose.model("ProductStats", productStatSchema);
export default ProductStats;
