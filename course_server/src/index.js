import dotenv from "dotenv"
import connectDB from "./db/dbConnection.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.listen(PORT, (req, res) => {
            console.log(`Server is running on http://localhost:${PORT}`);
        })
    })
    .catch((e) => {
        console.log("Error while connecting.");
    })