import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/user.model.js';
dotenv.config();

export const isAuth = async (req, res, next) => {
    try {
        // token in the cookies
        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json("please try to login")
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedToken) {
            return res.status(400).json("invalid token");
        }

        const user = await User.findById(decodedToken.userId)

        if (!user) {
            return res.status(404).json("user not found");
        }

        req.user = user;

        next();

    } catch (error) {
        console.error("Error in isAuth middleware:", error.message);
        return res.status(500).json({ message: "Internal server error in authentication middleware" });
    }
}