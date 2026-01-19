import express from "express";

const app = express();

app.use(express.json());

app.use("/health", (req, res) => {
    res.send("Nilesh Sadhu is watching.");
});

import AuthRouter from "./routes/auth.route.js";
import CoursesRoute from "./routes/course.route.js";
import AdminRoutes from "./routes/admin.route.js";

app.use("/api/v1/auth", AuthRouter);
app.use("api/v1/course", CoursesRoute);
app.use("api/v1/admin", AdminRoutes);

export default app;