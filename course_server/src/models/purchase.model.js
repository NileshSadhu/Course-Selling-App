import mongoose, { Schema } from "mongoose";

const PurchaseSchema = new Schema(
    {
        courseId: {
            type: mongoose.Types.ObjectId,
        },
        userId: {
            type: mongoose.Types.ObjectId,
        }
    }
);

export const Purchase = mongoose.model("CoursePurchase", PurchaseSchema);