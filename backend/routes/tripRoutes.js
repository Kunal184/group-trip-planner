import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createTrip, joinTrip, getMyTrips } from "../controllers/tripController.js";

const router = express.Router();

router.post("/create", authMiddleware, createTrip);
router.post("/join", authMiddleware, joinTrip);
router.get("/my-trips", authMiddleware, getMyTrips);

export default router;
