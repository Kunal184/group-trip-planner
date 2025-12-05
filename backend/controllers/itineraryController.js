import Itinerary from "../models/Itinerary.js";
import Trip from "../models/Trip.js";

// Create a new day in itinerary
export const createDay = async (req, res) => {
  try {
    const { tripId, day } = req.body;

    // Check if trip exists
    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    // Only members can add itinerary
    if (!trip.members.includes(req.user.id)) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // Check if this day already exists
    const existing = await Itinerary.findOne({ tripId, day });
    if (existing) {
      return res.status(400).json({ message: "Day already exists" });
    }

    const newDay = await Itinerary.create({
      tripId,
      day,
      activities: [],
      createdBy: req.user.id,
    });

    res.status(201).json(newDay);
  } catch (error) {
    res.status(500).json({ message: "Error creating day" });
  }
};

// Add an activity to a specific day
export const addActivity = async (req, res) => {
  try {
    const { itineraryId, title, time, description } = req.body;

    const itinerary = await Itinerary.findById(itineraryId);
    if (!itinerary) return res.status(404).json({ message: "Day not found" });

    itinerary.activities.push({ title, time, description });
    await itinerary.save();

    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ message: "Error adding activity" });
  }
};

// Get full itinerary for a trip
export const getItinerary = async (req, res) => {
  try {
    const { tripId } = req.params;

    const itinerary = await Itinerary.find({ tripId }).sort({ day: 1 });

    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ message: "Error fetching itinerary" });
  }
};

export const deleteDay = async (req, res) => {
  try {
    const { itineraryId } = req.body;

    const deleted = await Itinerary.findByIdAndDelete(itineraryId);
    if (!deleted) return res.status(404).json({ message: "Day not found" });

    res.json({ message: "Day deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting day" });
  }
};

export const updateDay = async (req, res) => {
  try {
    const { itineraryId, day } = req.body;

    const updated = await Itinerary.findByIdAndUpdate(
      itineraryId,
      { day },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Day not found" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating day" });
  }
};

export const deleteActivity = async (req, res) => {
  try {
    const { itineraryId, activityId } = req.body;

    const itinerary = await Itinerary.findById(itineraryId);
    if (!itinerary) return res.status(404).json({ message: "Day not found" });

    itinerary.activities = itinerary.activities.filter(a => a._id.toString() !== activityId);
    await itinerary.save();

    res.json({ message: "Activity deleted", itinerary });
  } catch (error) {
    res.status(500).json({ message: "Error deleting activity" });
  }
};

export const updateActivity = async (req, res) => {
  try {
    const { itineraryId, activityId, title, time, description } = req.body;

    const itinerary = await Itinerary.findById(itineraryId);
    if (!itinerary) return res.status(404).json({ message: "Day not found" });

    const activity = itinerary.activities.id(activityId);
    if (!activity) return res.status(404).json({ message: "Activity not found" });

    if (title) activity.title = title;
    if (time) activity.time = time;
    if (description) activity.description = description;

    await itinerary.save();

    res.json({ message: "Activity updated", itinerary });
  } catch (error) {
    res.status(500).json({ message: "Error updating activity" });
  }
};
