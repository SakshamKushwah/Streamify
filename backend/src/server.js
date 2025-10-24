import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import chatRoutes from "./routes/chat.route.js"

import { connectDB } from "./lib/db.js";
 

const app = express();
const PORT = process.env.PORT;


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // to allow cookies to be sent cookies
})
);
app.use(express.json());
app.use(cookieParser());
 
app.use("/api/auth", authRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT , () => {
    console.log(`server is running on port ${PORT}`);
    connectDB();
    console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);

});