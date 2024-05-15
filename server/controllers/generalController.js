import User from "../models/userModel.js";
import Transactions from "../models/transactionsModel.js";
import OverallStats from "../models/OverallStats.js";
import Products from "../models/productModel.js";

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    //Hardcoded data for now
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    // Resent Transactions
    const transactions = await Transactions.find()
      .limit(50)
      .sort({ createdAt: -1 });

    // Overall Stats
    const overallStats = await OverallStats.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      monthlyData,
      yearlySalesTotal,
      salesByCategory,
    } = overallStats[0];

    const thisMonthStats = overallStats[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStats[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      transactions,
      totalCustomers,
      yearlyTotalSoldUnits,
      monthlyData,
      yearlySalesTotal,
      salesByCategory,
      thisMonthStats,
      todayStats,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSearchResults = async (req, res) => {
  try {
    const searchQuery = req.query.q;

    // console.log(searchQuery);

    const searchResultsUser = await User.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
      ],
    });

    const searchResultsTransactions = await Transactions.find({
      $or: [{ userId: { $regex: searchQuery, $options: "i" } }],
    });

    const searchResultsProducts = await Products.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { category: { $regex: searchQuery, $options: "i" } },
      ],
    });

    res
      .status(200)
      .json({
        searchResultsUser,
        searchResultsTransactions,
        searchResultsProducts,
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
