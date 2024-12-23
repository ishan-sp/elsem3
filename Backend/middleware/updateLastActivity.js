import User from "../models/user.js";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/seasavvy")
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(`Error : ${err}`));

const pointsPerDay = [10, 15, 20, 25, 30, 35, 40];  // Points for Day 1 to Day 7
const additionalPointsPerDay = 5;  // Points added after Day 7

async function updateUserPointsInDatabase(userId, points) {
    try {
        const user = await User.findById(userId);
        if (!user) {
            console.log(`User with ID ${userId} not found`);
            return;
        }
        user.points += points;
        await user.save();
        console.log(`Successfully updated user ${userId} points. New points: ${user.points}`);
    } catch (error) {
        console.error("Error updating user points:", error);
    }
}

function updateLastActivity(req, res, next) {
    if (req.session) {
        const currentTime = new Date();

        if (!req.session.totalActiveTime) {
            req.session.totalActiveTime = 0;
        }
        if (!req.session.accumulatedPoints) {
            req.session.accumulatedPoints = 0;
        }

        if (!req.session.streak) {
            req.session.streak = 0;
        }
        if (!req.session.lastLoginDate) {
            req.session.lastLoginDate = currentTime.toISOString();
        }

        // Check if user is logging in the next day
        const lastLogin = new Date(req.session.lastLoginDate);
        const timeDifference = currentTime - lastLogin;
        const dayDifference = timeDifference / (1000 * 3600 * 24); // Convert to days

        if (dayDifference >= 1) {  // User logs in on the next day or after
            if (dayDifference >= 1 && dayDifference <= 2) {
                req.session.streak += 1;  // Increase streak for consecutive days
            } else if (dayDifference > 2) {
                req.session.streak = 1;  // Reset streak if more than 2 days gap
            }

            // Calculate points based on streak
            let points = 0;
            if (req.session.streak <= 7) {
                points = pointsPerDay[req.session.streak - 1];  // Day 1 to 7
            } else {
                points = pointsPerDay[6] + (req.session.streak - 7) * additionalPointsPerDay; // Day 8+
            }

            req.session.accumulatedPoints += points;
            console.log(`User logged in. Streak: ${req.session.streak}, Earned Points: ${points}`);

            // Update last login date and total active time
            req.session.lastLoginDate = currentTime.toISOString();

            // Update points in the database once the accumulated points reach 1 or more
            while (req.session.accumulatedPoints >= 1) {
                updateUserPointsInDatabase(req.session.userId, 1);
                req.session.accumulatedPoints -= 1;
            }

            req.session.totalActiveTime = req.session.totalActiveTime || 0;
            console.log(`Total active time: ${req.session.totalActiveTime} minutes, Accumulated points: ${req.session.accumulatedPoints}`);
        }
    }

    next();
}

export default updateLastActivity;
