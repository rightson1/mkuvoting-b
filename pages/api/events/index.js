import db from "../../../models/db";
import Event from "../../../models/Events";
const handler = async(req, res) => {
    await db();
    if (req.method === "POST") {
        try {
            const event = await Event.create(req.body);
            res.status(201).json(event);
        } catch (error) {
            res.status(500).json(error);
        }
    } else if (req.method === "GET") {
        try {
            const event = await Event.find();

            res.status(200).json(event);
        } catch (error) {
            res.status(500).json(error);
        }
    } else if (req.method === "DELETE") {
        const { id } = req.query;
        try {
            const event = await Event.findOneAndDelete({
                id: id,
            });
            res.status(200).json(event);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(200).json({ error: "Method not allowed" });
    }
};
export default handler;