import jwt from "jsonwebtoken";

export const adminAuth = async (req, res, next) => {
    try {
        const adminAuthHeader = req.headers.authorization;

        if (!adminAuthHeader || !adminAuthHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        const token = adminAuthHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.ADMIN_KEY);

        req.admin = decoded;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Expire or invalid token"
        })
    }
};