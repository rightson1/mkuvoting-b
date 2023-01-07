import db from "../../../utils/db";
import handleCors from "../../../handleCors";

const handler = async(req, res) => {
    const { method } = req;
    await handleCors(req, res);

    if (method === "GET") {
        const faqs = await db.collection("faqs").get();
        const faq = faqs.docs.map((doc) => ({ id: doc.id, faq: doc.data() }));

        res.status(200).json(faq);
    } else if (method === "POST") {
        try {
            const { id } = await db.collection("faqs").add({
                ...req.body,
                created: new Date().toISOString(),
            });
            res.status(200).json({ id });
        } catch (e) {
            res.status(400).json({ message: "Something went wrong" });
        }
    } else if (method === "DELETE") {
        const { id } = req.query;
        try {
            const faq = await db.collection("faqs").doc(id).delete();
            res.status(200).json(faq);
        } catch (error) {
            res.status(500).json(error);
        }
    } else if (method === "PUT") {
        const { id } = req.query;
        try {
            const faq = await db
                .collection("faqs")
                .doc(id)
                .update({
                    ...req.body,
                    updated: new Date().toISOString(),
                });
            res.status(200).json(faq);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(200).json({ error: "Method not allowed" });
    }
};
export default handler;