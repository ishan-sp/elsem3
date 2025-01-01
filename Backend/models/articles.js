import mongoose from "mongoose";

// Define the schema for articles
const articleSchema = new mongoose.Schema({
    articleName: {
        type: String,
        required: true, // Ensuring article name is always present
    },
    courseID: {
        type: String,  // Reference to the Course model
        ref: "Course",  // This links to the Course schema/model
        required: true, // Ensuring courseID is always present
    },
    points: {
        type: Number,  // Number of points related to the article
        required: true,
        min: 0, // Ensuring points are non-negative
    },
    content: {
        type: String, // Article content as a string
        required: true, // Ensuring content is always present
    },
});

// Export the model for the Article schema
export default mongoose.model("Article", articleSchema);
