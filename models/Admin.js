import { Schema, model, models } from "mongoose";

const AdminSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "admin",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
export default models.Admin || model("Admin", AdminSchema);