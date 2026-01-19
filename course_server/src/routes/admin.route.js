import { Router } from "express";
import {
    adminChangePassword,
    adminCreateCourse,
    adminDeleteCourse,
    adminGetAllCourses,
    adminLogin,
    adminRegister,
    adminUpdateCourse
} from "../controller/admin.controller.js";

import { adminAuth } from "../middlewares/admin.middleware.js";

const adminRouter = Router();

adminRouter.route("/login").post(adminLogin);
adminRouter.route("/register").post(adminRegister);
adminRouter.route("/get-admin-courses").get(adminGetAllCourses);

adminRouter.route("/chage-password").post(adminAuth, adminChangePassword);
adminRouter.route("/update-course").put(adminAuth, adminUpdateCourse);
adminRouter.route("/create-course").post(adminAuth, adminCreateCourse);
adminRouter.route("/delete-course").delete(adminAuth, adminDeleteCourse);

export default adminRouter;