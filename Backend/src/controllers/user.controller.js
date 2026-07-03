import bcryptjs from 'bcryptjs'

import User from "../models/user.model.js";
import genToken from '../config/token.js';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "fill all the details" });
        }

        if (password.length < 6 || password.length > 20) {
            return res.status(400).json({ message: "Password must be between 6 and 20 characters long" });
        }

        if (name.length > 30) {
            return res.status(400).json({ message: "Name is too long" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
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
            sameSite: "none",
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

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "please enter all the details" });
        }

        const existingUser = await User.findOne({ email }).select("+password");

        if (!existingUser) {
            return res.status(400).json({ message: "invalid credentials" });
        }

        const verifiedPass = await bcryptjs.compare(password, existingUser.password)

        if (!verifiedPass) {
            // 🛠️ NEW: Increment failed attempts on wrong password
            existingUser.loginAttempts += 1;

            if (existingUser.loginAttempts >= 5) {
                existingUser.lockUntil = Date.now() + 2 * 60 * 60 * 1000; // Lock for 2 hours
                existingUser.loginAttempts = 0; // Reset counter for next time
            }

            await existingUser.save();
            return res.status(400).json({ message: "invalid credentials" });
        }

        //  Reset failed attempts on a successful login
        if (existingUser.loginAttempts > 0 || existingUser.lockUntil) {
            existingUser.loginAttempts = 0;
            existingUser.lockUntil = undefined;
            await existingUser.save();
        }


        const token = genToken(existingUser._id)

        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "none",
            secure: process.env.NODE_ENV === "production",
        })

        return res.status(200).json({
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email
            },

        });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error in the login controller", error: error.message });

    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "none",
            secure: process.env.NODE_ENV === "production"
        });

        return res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        console.error("intrnal server error in Logout contorller", error);
        return res.status(500).json({ message: "Internal server error during logout" });
    }
}

export const googleAuthController = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        let user = await User.findOne({ email })

        if (!user) {
            user = await User.create({
                name: name,
                email: email,
            })
        }

        let token = genToken(user._id)
        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'none'
        })

        return res.status(200).json({ message: "user created", user })

    } catch (error) {
        return res.status(500).json({ message: `internal server error in googleAuthController ${error}` })
    }
}