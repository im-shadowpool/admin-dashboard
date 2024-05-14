import OverallStatsModel from "../models/OverallStats.js";

export const getSales = async (req, res) => {
  try {
    const OverallStatsData = await OverallStatsModel.find();
    res.status(200).json(OverallStatsData[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
