import Products from "../models/productModel.js";
import ProductStats from "../models/productStatModel.js";
import User from "../models/userModel.js";
import Transactions from "../models/transactionsModel.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const productStat = await ProductStats.find({ productId: product._id });
        return {
          ...product._doc,
          productStat,
        };
      })
    );
    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
      };
      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transactions.find({
      $or: [
        { cost: { $regex: search, $options: "i" } },
        { userId: { $regex: search, $options: "i" } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transactions.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
