import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import Course from "../models/course.js"; // Capitalized Course for better convention
import { validationResult, body } from "express-validator";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

mongoose.connect("mongodb://localhost/seasavvy", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to database"))
    .catch((err) => console.error(`Error: ${err}`)); // Fixed error log syntax

router.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, "../../Frontend/public/seascholar.html"));
});

router.get("/api/courses", async (req, res) => {
    console.log("Reached endpoint /api/courses");
    const sessionUserId = req.session.userId;
    if (!sessionUserId) {
        return res.status(401).send("Please login to continue");
    }
    try {
        const courses = await Course.find({}, {
        });
        console.log(`courses ${courses}`);
        if(courses) {
            console.log("Sent course : ");
        }
        res.send({courses});
    } catch(err) {
        console.log(`Error " ${err}`);
    }
})
export default router;
