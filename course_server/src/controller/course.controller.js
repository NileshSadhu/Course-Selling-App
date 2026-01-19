import { Course } from "../models/course.model.js";
import { Purchase } from "../models/purchase.model.js";

export const purchase = async (req, res) => {
    try {
        const userId = req.user.id;
        const courseId = req.params;

        const course = await Course.findById({ courseId });
        if (!course) {
            return res.status(404).json({
                message: "Course not founnd."
            })
        }

        const courses = await Purchase.create(
            userId,
            courseId
        );

        return res.status(200).json({
            message: "Thanks for purchasing the course.",
            courses
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
};

export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({});

        return res.status(200).json({
            message: "Sending all courses",
            courses
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
};

export const purchasedCourse = async (req, res) => {
    try {
        const userId = req.user.id;
        const courseId = req.params;

        const course = await Course.findById({ courseId });
        if (!course) {
            return res.status(404).json({
                message: "Course not founnd."
            })
        }

        const courses = await Purchase.create(
            userId,
            courseId
        );

        return res.status(200).json({
            message: "Thanks for purchasing the course.",
            courses
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
};