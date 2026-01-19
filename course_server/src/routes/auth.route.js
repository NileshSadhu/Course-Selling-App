import { Router } from "express";
import { changePassword, login, register } from "../controller/auth.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/login").post(login);

router.route("/register").post(register);

router.route("/change-password").post(authCheck, changePassword);

export default router;
