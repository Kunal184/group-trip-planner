import Trip from "../models/Trip.js";
import User from "../models/User.js";

// Create Trip
export const createTrip = async (req, res) => {
    try {
        const { name, destination } = req.body;

        // generate 6-digit trip code
        const code = Math.random().toString().slice(2, 8);

        const trip = await Trip.create({
            name,
            destination,
            code,
            createdBy: req.user.id,
            members: [req.user.id]
        });

        res.status(201).json(trip);
    } catch (error) {
        res.status(500).json({ message: "Error creating trip" });
    }
};

// Join Trip
export const joinTrip = async (req, res) => {
    try {
        const { code } = req.body;

        const trip = await Trip.findOne({ code });
        if (!trip) return res.status(404).json({ message: "Trip not found" });

        if (trip.members.includes(req.user.id))
            return res.status(400).json({ message: "Already a member" });

        trip.members.push(req.user.id);
        await trip.save();

        res.json({ message: "Joined trip", trip });
    } catch (error) {
        res.status(500).json({ message: "Error joining trip" });
    }
};

// Get trips for logged-in user
export const getMyTrips = async (req, res) => {
    try {
        const trips = await Trip.find({ members: req.user.id });
        res.json(trips);
    } catch (error) {
        res.status(500).json({ message: "Error fetching trips" });
    }
};
