import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseName:  {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    articles: {
        type: [String], 
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    enrolled: {
        type: Number,  // The number of users enrolled
        default: 0,  // Default to 0 if not specified
    },
    learnings: {
        type: [Object],  // Array of JSON objects representing the learning points
        default: [],  // Default to an empty array if not specified
    },
});

export default mongoose.model("Course", courseSchema);
