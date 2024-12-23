import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import user from "../models/user.js";
import {validationResult, body} from "express-validator";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
mongoose.connect("mongodb://localhost/seasavvy")
    .then(()=> console.log("Connected to database"))
    .catch((err)=> console.log(`Error : ${err}`));

    router.get("/", async (req, res) => {
    const sessionID = req.session.userId;
    console.log(sessionID);

    if (!sessionID) {
        return res.status(401).send("Please login to continue");
    }

    try {
        // Fetch the top 10 users sorted by points
        const topUsers = await user.find().sort({ points: -1 }).limit(10);

        // Check if the session user exists in the top 10
        const sessionUserIndex = topUsers.findIndex(user => user._id.toString() === sessionID);

        if (sessionUserIndex !== -1) {
            // If session user is in top 10, add {"present": true} at the start
            const response = [
                { present: true },
                ...topUsers.map(user => user.toObject())
            ];
            return res.json(response);
        } else {
            // If session user is not in top 10, fetch the session user from the database
            const sessionUserData = await user.findById(sessionID);

            if (!sessionUserData) {
                return res.status(404).send("User not found");
            }

            // Add {"present": false} and append the session user at the end
            const response = [
                { present: false, userLoggedIn: sessionID},
                ...topUsers.map(user => user.toObject()),
                sessionUserData.toObject()
            ];
            return res.json(response);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error. Please try again");
    }
});

    
    export default router;
    
    