import { Schema, model, models } from "mongoose";

const VoterSchema = new Schema({
    reg: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        default: null,
    },
    name: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
export default models.Voter || model("Voter", VoterSchema);