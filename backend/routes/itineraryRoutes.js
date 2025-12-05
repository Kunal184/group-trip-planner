import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createDay, addActivity, getItinerary } from "../controllers/itineraryController.js";
import { deleteDay, updateDay, deleteActivity, updateActivity } from "../controllers/itineraryController.js";

const router = express.Router();

// Delete a day
router.delete("/delete-day", authMiddleware, deleteDay);

// Update a day
router.put("/update-day", authMiddleware, updateDay);

// Delete an activity
router.delete("/delete-activity", authMiddleware, deleteActivity);

// Update an activity
router.put("/update-activity", authMiddleware, updateActivity);

// Create a new day in the itinerary
router.post("/create-day", authMiddleware, createDay);

// Add an activity to a specific day
router.post("/add-activity", authMiddleware, addActivity);

// Get full itinerary for a trip
router.get("/:tripId", authMiddleware, getItinerary);

export default router;
