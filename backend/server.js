import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import authRoutes from "./routes/authRoutes.js";


dotenv.config();
console.log("Mongo URI:", process.env.MONGO_URI);

import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB Error:", err));



const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);


// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO for real-time features
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
});

// Basic test route
app.get("/", (req, res) => {
    res.send("Trip Planner backend running");
});

// Start the server
server.listen(5000, () => {
    console.log("Server running on port 5000");
});
