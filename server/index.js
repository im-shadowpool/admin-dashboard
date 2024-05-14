import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
/* Import Routes */
import generalRoutes from "./routes/generalRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import managementRoutes from "./routes/managementRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";

/* Import Data */
import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat } from "./data/index.js";

/* Import Models */
import User from "./models/userModel.js";
import Products from "./models/productModel.js";
import ProductStats from "./models/productStatModel.js";
import Transactions from "./models/transactionsModel.js";
import OverallStatsModel from "./models/OverallStats.js";

/* Configuration */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Routes */
app.use("/general", generalRoutes);
app.use("/client", clientRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* Database Connection */
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} and MongoDB is connected`);

      /* Seed Data */
      // User.insertMany(dataUser)
      // Products.insertMany(dataProduct);
      // ProductStats.insertMany(dataProductStat);
      // Transactions.insertMany(dataTransaction);
      // OverallStatsModel.insertMany(dataOverallStat);
    });
  })
  .catch((err) => {
    console.log(err + "Database connection failed");
  });
