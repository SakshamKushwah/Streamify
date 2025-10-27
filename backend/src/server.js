import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path"

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow cookies to be sent
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req,res)=> {
        res.sendFile(path.join(__dirname, "../frontend" , "dist" , "index.html"));
    })
}

// Start server
app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server is running on port ${PORT}`);
  console.log("🔐 Loaded JWT_SECRET:", process.env.JWT_SECRET ? "OK" : "MISSING");
});
