import express from "express";
import { getDashboard, getSearchResults, getUser } from "../controllers/generalController.js";

const router = express.Router();

router.get("/user/:id", getUser);
router.get("/dashboard", getDashboard);
router.get("/search", getSearchResults);

export default router;