import express from "express";
import User from "../models/user-model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).send("All fields are required");
        }
        if (password.length < 6) {
            return res.status(400).send("Password must be at least 6 characters long");
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).send("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        generateToken(newUser._id, res);
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            profilePic: newUser.profilePic
        });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send("Internal Server error");
    }
};

export const login = async (req, res) => {
        const { email, password } = req.body;
   try {
         if (!email || !password) {
              return res.status(400).json({ message: "All fields are required" });
         }
         const user = await User.findOne({ email });
         if (!user) {
              return res.status(400).json({ message: "Invalid credentials" });
         }
         const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            generateToken(user._id, res);
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                profilePic: user.profilePic
            });

   } catch (error) {
         console.error(`Error: ${error.message}`);
         res.status(500).send("Internal Server error");
   }
};

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).send("Logged out successfully"); 
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send("Internal Server error");
    }
};

export const updateProfile = async (req, res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).send("Profile picture is required");
        }
        const uploadedResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId,{ profilePic: uploadedResponse.secure_url },{ new: true });
        res.status(200).json(updatedUser);
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send("Internal Server error");
    }

};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send("Internal Server error");
    }
};