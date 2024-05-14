import express from "express";
import { getAdmins, getAffiliates } from "../controllers/managementController.js";

const router = express.Router();

router.get("/admins", getAdmins);
router.get("/affiliates/:id", getAffiliates)

export default router;