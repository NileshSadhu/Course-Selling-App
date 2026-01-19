import jwt from "jsonwebtoken";

export const adminAuth = async (req, res, next) => {
    try {
        const adminAuthHeader = req.headers.authorization;

        if (!adminAuthHeader || !adminAuthHeader.startWith("Bearer")) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        const token = adminAuthHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.ADMIN_KEY);

        req.user = decoded;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Expire or invalid token"
        })
    }
};