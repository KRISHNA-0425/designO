import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/user.model.js';
dotenv.config();

export const isAuth = async (req, res, next) => {
    try {
        // Fallback: Check cookies FIRST, then check the Authorization Header
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            // Consistent JSON structure object output
            return res.status(400).json({ message: "please try to login" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken) {
            return res.status(400).json({ message: "invalid token" });
        }

        // Make sure your token generation uses 'userId' or '_id'
        const user = await User.findById(decodedToken.userId || decodedToken._id);

        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("Error in isAuth middleware:", error.message);
        return res.status(401).json({ message: "Session expired or invalid token" });
    }
}