import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    name: { type: String, required: true },
    destination: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    startDate: { type: String, required: true }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Trip", tripSchema);
