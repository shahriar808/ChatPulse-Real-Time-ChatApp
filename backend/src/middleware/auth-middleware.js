import jwt from "jsonwebtoken";
import User from "../models/user-model.js";
import cookieParser from "cookie-parser";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).send("Unauthorized: No token provided");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).send("Unauthorized: Invalid token");
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).send("User not found");
        }
        req.user = user;
        next();
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send("Internal Server error");
    }
};