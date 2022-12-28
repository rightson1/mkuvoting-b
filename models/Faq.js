import { Schema, model, models } from "mongoose";

const FaqSchema = new Schema({
    quiz: {
        type: String,
        required: true,
    },
    ans: {
        type: String,
        required: true,
    },
}, { timestamps: true });
export default models.Faq || model("Faq", FaqSchema);