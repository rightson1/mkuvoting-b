import db from "../../../models/db";
import NextCors from "nextjs-cors";
import Voter from "../../../models/Voter";
import handleCors from "../../../handleCors";
const handler = async(req, res) => {
    await handleCors(req, res);
    await db();
    if (req.method === "POST") {
        const { name, email, password } = req.body;

        try {
            const voter = await Voter.create(req.body);
            res.status(201).json(voter);
        } catch (error) {
            res.status(500).json(error);
        }
    } else if (req.method === "GET") {
        const { email } = req.query;
        if (email) {
            try {
                const voter = await Voter.findOne({ email });

                res.status(200).json(voter);
            } catch (error) {
                res.status(500).json(error);
            }
        } else {
            try {
                const voter = await Voter.find();
                if (voter) {
                    const results = voter.map((voter) => {
                        const { password, ...rest } = voter._doc;
                        return rest;
                    });
                    res.status(200).json(results);
                }
                res.status(200).json(voter);

                res.status(200).json(voter);
            } catch (error) {
                res.status(500).json(error);
            }
        }
    } else if (req.method === "DELETE") {
        const { id } = req.query;
        try {
            const voter = await Voter.findOneAndDelete({ _id: id });
            res.status(200).json(voter);
        } catch (error) {
            res.status(500).json(error);
        }
    } else if (req.method === "PUT") {
        res.status(200).json({ error: "AM FUCKED" });
    } else {
        res.status(200).json({ error: "Method not allowed" });
    }
};
export default handler;