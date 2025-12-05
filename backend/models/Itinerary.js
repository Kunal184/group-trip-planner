import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    day: {
      type: Number,
      required: true,
    },
    activities: [
      {
        title: { type: String, required: true },
        time: { type: String },
        description: { type: String }
      }
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Itinerary", itinerarySchema);
