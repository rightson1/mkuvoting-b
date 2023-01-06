import NextCors from "nextjs-cors";
import handleCors from "../../../handleCors";
import Candidate from "../../../models/Candidate";
import mongodb from "../../../models/db";

const handler = async(req, res) => {
    const { method } = req;
    await mongodb();
    await handleCors(req, res);

    if (method === "GET") {
        const { id } = req.query;
        if (req.query.id) {
            const candidates = await Candidate.find({ positionId: id });
            res.status(200).json(candidates);
        } else {
            const candidates = await Candidate.find();
            res.status(200).json(candidates);
        }
    } else if (method === "POST") {
        const exists = await Candidate.findOne({ reg: req.body.reg });
        if (exists) {
            return res.status(400).json({ error: "Candidate already exists" });
        } else {
            Candidate.create(req.body)
                .then((candidate) => {
                    return res.status(200).json(candidate);
                })
                .catch((e) => {
                    return res.status(400).json(e);
                });
        }
    } else if (method === "DELETE") {
        const { id } = req.query;
        try {
            await Candidate.findByIdAndDelete(id);
            res.status(200).json("deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    } else if (method === "PUT") {
        const { id } = req.query;
        try {
            const candidateUpdate = await Candidate.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            res.status(200).json(candidateUpdate);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(200).json({ error: "Method not allowed" });
    }
};
export default handler;