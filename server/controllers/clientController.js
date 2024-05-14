import Products from "../models/productModel.js";
import ProductStats from "../models/productStatModel.js";
import User from "../models/userModel.js";
import Transactions from "../models/transactionsModel.js";
import getCountryIso3 from "country-iso-2-to-3";

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
    console.log(page, pageSize);
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      console.log(sortParsed);
      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
      };
      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transactions.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);
    // console.log(transactions);
    // const total = await Transactions.countDocuments({
    //   $or: [
    //     { cost: { $regex: new RegExp(search, "i") } },
    //     { userId: { $regex: new RegExp(search, "i") } },
    //     { _id: { $regex: new RegExp(search, "i") } },
    //   ],
    // });

    const total = await Transactions.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    console.log("Total matching documents:", total);
    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mappedCountries = users.reduce((acc, { country }) => {
      // console.log(acc, country);
      const iso3 = getCountryIso3(country);
      // console.log(acc[iso3]);
      if (!acc[iso3]) {
        acc[iso3] = 0;
        // console.log("in if: ", acc[iso3]);
      }
      acc[iso3]++;
      // console.log("out if: ", acc[iso3])
      return acc;
    }, {});

    // console.log(Object.entries(mappedCountries));

    const formattedLocations = Object.entries(mappedCountries).map(
      ([country, count]) => {
        return {
          id: country,
          value: count,
        };
      }
    );

    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
