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
adminRouter.route("/get-admin-courses").get(adminAuth, adminGetAllCourses);

adminRouter.route("/change-password").post(adminAuth, adminChangePassword);
adminRouter.route("/create-course").post(adminAuth, adminCreateCourse);
adminRouter.route("/update-course/:id").patch(adminAuth, adminUpdateCourse);
adminRouter.route("/delete-course").delete(adminAuth, adminDeleteCourse);

export default adminRouter;