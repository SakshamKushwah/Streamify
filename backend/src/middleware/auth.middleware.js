import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to protect routes
export const protectRoute = async (req, res, next) => {

    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({ message: "Not authorized , token missing"});
        }

       const decoded = jwt.verify(token, process.env.JWT_SECRET);


        if(!decoded){
            return res.status(401).json({ message: "Not authorized , token invalid"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({ message: "Not authorized , user not found"});
        }

        req.user = user;

        // proceed to the next middleware or route handler which is ( onboard)
        next();

    } catch (error) {
        console.log("Error in protectRoute middleware", error);
        res.status(401).json({ message: "Internal Server Error" });
        
    }
}