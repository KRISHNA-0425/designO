import bcryptjs from 'bcryptjs'

import User from "../models/user.model.js";
import genToken from '../config/token.js';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "fill all the details" });
        }

        const exisitingUser = await User.findOne({ email });

        if (exisitingUser) {
            return res.status(400).json({ message: "user already exsists, kindly try to login" });
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPass = await bcryptjs.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPass
        })

        await user.save();

        const token = genToken(user._id);

        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "Lax",
            secure: process.env.NODE_ENV === 'production'
        })

        return res.status(201).json({
            user: {
                name: user.name,
                id: user._id,
                email: user.email
            }
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}