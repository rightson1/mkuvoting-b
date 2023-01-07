import NextCors from "nextjs-cors";
import handleCors from "../../../handleCors";
import Vote from "../../../models/Vote";
import mongodb from "../../../models/db";
import db from "../../../utils/db";

const handler = async(req, res) => {
    const { method } = req;
    await mongodb();
    await handleCors(req, res);

    if (method === "GET") {
        const { position } = req.query;
        const { reg } = req.query;
        if (reg) {
            const voter = await Vote.count({
                voterReg: reg,
            });
            res.status(200).json(voter);
        } else if (position) {
            const votes = await Vote.aggregate([{
                    $match: {
                        position: position,
                    },
                },
                {
                    $group: {
                        _id: "$candidateName",
                        count: { $sum: 1 },
                    },
                },
            ]);
            res.status(200).json(votes);
        } else {
            // const votes = await Vote.aggregate([{
            //     $group: {
            //         _id: { candidateId: "$candidateId", name: "$candidateName" },

            //         count: { $sum: 1 },
            //     },
            // }, ]);
            const votes = await Vote.aggregate([{
                $group: {
                    _id: { position: "$position", name: "$candidateName" },

                    count: { $sum: 1 },
                },
            }, ]);
            res.status(200).json(votes);
        }
    } else if (method === "POST") {
        try {
            const votes = await Vote.create(req.body);
            await Promise.all(
                req.body.map(async(vote) => {
                    return db.collection("votes").add(vote);
                })
            );
            res.status(200).json("sucess");
        } catch (e) {
            res.status(400).json({ message: "Something went wrong" });
        }
    } else if (method === "DELETE") {
        const { id } = req.query;
        try {
            await Vote.findByIdAndDelete(id);
            res.status(200).json("deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    } else if (method === "PUT") {
        const { id } = req.query;
        try {
            const voteUpdate = await Vote.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            res.status(200).json(voteUpdate);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(200).json({ error: "Method not allowed" });
    }
};
export default handler;