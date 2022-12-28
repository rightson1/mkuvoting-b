import db from "../../../models/db";
import Admin from "../../../models/Admin";
const handler = async (req, res) => {
    await db()
    if (req.method === "POST") {
        const { name, email, password } = req.body;

        try {
            const admin = await Admin.create({
                name,
                email,
                password,
            });
            res.status(201).json(admin);
        } catch (error) {
            res.status(500).json(error);
        }
    } else if (req.method === "GET") {
        const { email } = req.query;
        if (email) {
            try {
                const admin = await Admin.findOne({ email });

                res.status(200).json(admin);
            } catch (error) {
                res.status(500).json(error);
            }
        } else {
            try {
                const admin = await Admin.find();

                res.status(200).json(admin);
            } catch (error) {
                res.status(500).json(error);
            }
        }
    } else if (req.method === "DELETE") {
        const { id } = req.query;
        try {
            const admin = await Admin.findOneAndDelete({ _id: id });
            res.status(200).json(admin);
        } catch (error) {
            res.status(500).json(error);
        }
    } else if (req.method === "PUT") {
        res.status(200).json({ error: "AM FUCKED" })
    }

    else {
        res.status(200).json({ error: "Method not allowed" });
    }



};
export default handler;