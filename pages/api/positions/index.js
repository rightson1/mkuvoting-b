import db from "../../../models/db";
import Position from "../../../models/Position";
const handler = async (req, res) => {
    await db()
    if (req.method === "POST") {

        try {
            const position = await Position.create(req.body);
            res.status(201).json(position);
        } catch (error) {
            res.status(500).json(error);
        }
    } else if (req.method === "GET") {
        const { name } = req.query;
        if (name) {
            try {
                const position = await Position.findOne({ name });

                res.status(200).json(position);
            } catch (error) {
                res.status(500).json(error);
            }
        } else {
            try {
                const positions = await Position.find();

                res.status(200).json(positions);
            } catch (error) {
                res.status(500).json(error);
            }
        }
    } else if (req.method === "DELETE") {
        const { id } = req.query;
        try {
            const position = await Position.findOneAndDelete({ _id: id });
            res.status(200).json(position);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(200).json({ error: "Method not allowed" });
    }


};
export default handler;