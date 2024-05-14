import express from "express";

const router = express.Router();

import { getSales } from "../controllers/salesController.js";

router.get("/sales", getSales);

export default router;
