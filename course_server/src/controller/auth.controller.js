import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.PRIVATE_KEY,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Login successful",
            token: token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(8);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashPassword
        });

        const token = jwt.sign({ id: newUser._id }, process.env.PRIVATE_KEY, { expiresIn: "1h" });

        return res.status(201).json({
            message: "User registered successfully",
            token: token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                message: "Old and new password are required"
            });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Old password is incorrect"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const newHash = await bcrypt.hash(newPassword, salt);

        user.password = newHash;
        await user.save();

        return res.status(200).json({
            message: "Password updated successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
