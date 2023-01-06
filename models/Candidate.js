import { Schema, model, models } from "mongoose";

const CandidateSchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        reg: {
            type: String,
            required: true,
            unique: true,
        },
        positionName: {
            type: String,
            required: true,
        },
        positionId: {
            type: String,
            required: true,
        },
        bio: {
            type: String,
        },
        manifesto: {
            type: String,
        },
    },

    { timestamps: true }
);
export default models.Candidate || model("Candidate", CandidateSchema);