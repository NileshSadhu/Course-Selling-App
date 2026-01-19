import { Router } from "express";
import { getAllCourses, purchase, purchasedCourse } from "../controller/course.controller.js";

const router = Router();

router.route("/purchased-courses").get(purchasedCourse);
router.route("/allCourse").get(getAllCourses);
router.route("/purchase").post(purchase);

export default router;