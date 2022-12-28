import db from "../../../models/db";
import Faq from "../../../models/Faq";
const handler = async (req, res) => {
    await db()
    if (req.method === "POST") {

        try {
            const faq = await Faq.create(req.body);
            res.status(201).json(faq);
        } catch (error) {
            res.status(500).json(error);
        }
    } else if (req.method === "GET") {
        try {
            const faqs = await Faq.find();

            res.status(200).json(faqs);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else if (req.method === "DELETE") {
        const { id } = req.query;
        try {
            const faq = await Faq.findOneAndDelete({ _id: id });
            res.status(200).json(faq);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(200).json({ error: "Method not allowed" });
    }



};
export default handler;