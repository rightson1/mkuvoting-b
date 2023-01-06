import { Schema, model, models } from "mongoose";

const VoteSchema = new Schema({
    position: {
        type: String,
        required: true,
    },
    candidateId: {
        type: String,
        required: true,
    },
    voterReg: {
        type: String,
        required: true,
    },
    candidateName: {
        type: String,
        required: true,
    },
}, { timestamps: true });
export default models.Vote || model("Vote", VoteSchema);