import mongoose, { Schema } from "mongoose";

const CourseSchema = new Schema(
    {
        imageUrl: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true
        }
    },
    { timestamps: true }
);

export const Course = mongoose.model("Course", CourseSchema);
