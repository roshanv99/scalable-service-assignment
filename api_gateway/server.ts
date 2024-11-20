import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/auth";
import dashboardRoute from './routes/dashboard';
import pinnedRoute from './routes/pinned';
import * as dotenv from 'dotenv';

dotenv.config();
// connectDB();
const app = express();
const PORT = 5001;
const MONGO_URI = process.env.MONGODB_URL;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/dashboard",dashboardRoute);
app.use("/pinned",pinnedRoute);


// Database Connection and Server Start
if(MONGO_URI)
    mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error("MongoDB connection error:", err));
