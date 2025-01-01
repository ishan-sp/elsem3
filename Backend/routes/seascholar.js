import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import Course from "../models/course.js"; // Capitalized Course for better convention
import { validationResult, body } from "express-validator";
import Article from "../models/articles.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

mongoose.connect("mongodb://localhost/seasavvy", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to database"))
    .catch((err) => console.error(`Error: ${err}`)); // Fixed error log syntax

router.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, "../../Frontend/public/seascholar.html"));
});

router.get("/courses", async (req, res) => {
    res.sendFile(path.join(__dirname, "../../Frontend/public/coursepage.html"));
});

router.get("/api/courses", async (req, res) => {
    console.log("Reached endpoint /api/courses");
    const sessionUserId = req.session.userId;
    
    if (!sessionUserId) {
        return res.status(401).send("Please login to continue");
    }

    try {
        // Find all courses
        const courses = await Course.find({});
        
        // If a specific course ID is provided in query
        if (req.query.courseid) {
            const specificCourse = courses.find(course => course._id.toString() === req.query.courseid);
            
            if (!specificCourse) {
                return res.status(404).send("Course not found");
            }

            // Fetch articles for this specific course
            const courseArticles = await Article.find({ 
                courseID: req.query.courseid 
            });

            // Map article IDs to article names
            const articleNames = courseArticles.map(article => article.articleName);

            // Construct the response object
            const responseData = {
                _id: specificCourse._id,
                courseName: specificCourse.courseName,
                level: specificCourse.level,
                description: specificCourse.description,
                articles: articleNames,
                rating: specificCourse.rating,
                enrolled: specificCourse.enrolled,
                learnings: specificCourse.learnings
            };

            console.log("Sent specific course data:", responseData);
            return res.json(responseData);
        }

        // If no specific course ID, return all courses
        const coursesResponse = await Promise.all(courses.map(async (course) => {
            // Fetch articles for each course
            const courseArticles = await Article.find({ 
                courseID: course._id.toString() 
            });

            // Map article IDs to article names
            const articleNames = courseArticles.map(article => article.articleName);

            return {
                _id: course._id,
                courseName: course.courseName,
                level: course.level,
                description: course.description,
                articles: articleNames,
                rating: course.rating,
                enrolled: course.enrolled,
                learnings: course.learnings
            };
        }));

        console.log(`Total courses: ${coursesResponse.length}`);
        res.json({ courses: coursesResponse });

    } catch(err) {
        console.error(`Error in /api/courses: ${err}`);
        res.status(500).json({ 
            message: "Internal server error", 
            error: err.message 
        });
    }
});


export default router;
