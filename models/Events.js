import { Schema, model, models } from "mongoose";

const EventSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
        required: true,
    },
    allDay: {
        type: String,
        required: true,
    },
}, { timestamps: true });
export default models.Event || model("Event", EventSchema);