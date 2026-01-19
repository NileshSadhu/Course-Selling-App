import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
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
        username: {
            type: String,
            unique: true,
            required: true
        }
    },
    { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
