import db from "../../../models/db";
import Position from "../../../models/Position";
import handleCors from "../../../handleCors";
const handler = async(req, res) => {
    await db();
    handleCors(req, res);
    if (req.method === "POST") {
        try {
            const position = await Position.create(req.body);
            res.status(201).json(position);
        } catch (error) {
            res.status(500).json(error);
        }
    } else if (req.method === "GET") {
        const { id } = req.query;
        const { vote } = req.query;

        if (id) {
            try {
                const position = await Position.findOne({ _id: id });
                res.status(200).json(position);
            } catch (error) {
                res.status(500).json(error);
            }
        } else {
            try {
                const positions = await Position.find();
                console.log("getting all positions");

                res.status(200).json(positions);
            } catch (error) {
                res.status(500).json(error);
            }
        }
    } else if (req.method === "PUT") {
        const { id } = req.query;

        try {
            const position = await Position.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            console.log(req.body);
            res.status(200).json(position);
        } catch (error) {
            res.status(500).json(error);
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