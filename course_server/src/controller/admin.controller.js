import { Admin } from "../models/admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Course } from "../models/course.model.js";

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({
                message: "Admin not found."
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password"
            })
        }

        const token = jwt.sign(
            { id: admin._id },
            process.env.ADMIN_KEY,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Login Successful",
            token: token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        })
    }
};

export const adminRegister = async (req, res) => {
    try {
        const { adminName, email, password } = req.body;

        if (!adminName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const existingUser = await Admin.findOne({
            $or: [{ email }, { password }]
        })

        if (existingUser) {
            return res.status(409).json({
                message: "Admin already exists"
            })
        }

        const salt = await bcrypt.genSalt(8);
        const hashPassword = await bcrypt.hash(password, salt);

        const newAdmin = Admin.create({
            adminName,
            email,
            password: hashPassword
        });

        const token = jwt.sign(
            { id: newAdmin._id },
            process.env.ADMIN_KEY,
            { expiresIn: "1h" }
        );

        return res.status(201).json({
            message: "Admin registered successfully",
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

export const adminChangePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const admin = await Admin.findById(req.user.id);
        if (!admin) {
            return res.status(404).json({
                message: "Admin not found"
            })
        }

        const isMatch = await bcrypt.compare(oldPassword, admin.password);
        if (!isMatch) {
            return res.status(401).json({
                messgae: "Old password is incorrect"
            })
        }

        const salt = await bcrypt.salt(8);
        const hashPassword = await bcrypt.hash(newPassword, salt);

        admin.password = hashPassword;
        await admin.save();

        return res.status(200).json({
            message: "Password update successfully"
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

export const adminUpdateCourse = async (req, res) => {
    try {
        const id = req.params;
        const adminId = req.admin.id;

        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            })
        }

        if (course.creator.toString() !== adminId.toString()) {
            return res.status(403).json({
                message: "You are not allowed to update someone else's course."
            })
        }

        const { imageUrl, title, description, price } = req.body;
        const updateFields = {};

        if (imageUrl) updateFields.imageUrl = imageUrl;
        if (title) updateFields.title = title;
        if (description) updateFields.description = description;
        if (price) updateFields.price = price;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({
                message: "Provide at least one field to update."
            })
        };

        const updateDoc = await Course.findByIdAndUpdate(
            id,
            { $set: updateFields }, //$set : Update ONLY the fields listed—don’t touch anything else.
            { new: true, runValidators: true }
            // $new : Return the updated version of the document.
            // $runValidators : Apply schema validation rules to the update
        );

        if (!updateDoc) {
            return res.status(404).json({
                message: "Document not found."
            })
        }

        return res.status(200).json({
            message: "Course updated successfully",
            update: updateDoc
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

export const adminGetAllCourses = async (req, res) => {
    try {
        const adminId = req.admin.id;
        const courses = await Course.find({ creator: adminId });

        return res.status(200).json({
            count: courses.length,
            courses
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

export const adminCreateCourse = async (req, res) => {
    try {
        const adminId = req.admin.id;
        const { imageUrl, title, description, price } = req.body;

        if (!imageUrl || !title || !description || price == null) {
            return res.status(400).json({
                message: "While creating new course all fields are required."
            })
        }

        const newCourse = await Course.create({
            imageUrl,
            title,
            description,
            price,
            creator: adminId
        });

        return res.status(200).json({
            message: "Course created successfully.",
            course: newCourse
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

export const adminDeleteCourse = async (req, res) => {
    try {

        const { id: courseId } = req.params;
        const adminId = req.admin.id;

        if (!courseId || !adminId) {
            return res.status(400).json({
                message: "Course and Admin Id is required"
            })
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found."
            })
        }

        if (course.creator.toString() !== adminId) {
            return res.status(403).json({
                message: "You are not allowed to delete someone else's course."
            })
        }

        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            message: "Course delete successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};