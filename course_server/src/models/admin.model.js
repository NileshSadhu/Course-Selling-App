import mongoose, { Schema } from "mongoose";

const AdminSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        adminName: {
            type: String,
            unique: true,
            required: true
        }
    },
    { timestamps: true }
);

export const Admin = mongoose.model("Admin", AdminSchema);
