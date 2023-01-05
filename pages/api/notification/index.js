import db from "../../../utils/db";
import handleCors from "../../../handleCors";

const handler = async(req, res) => {
    const { method } = req;
    handleCors(req, res);

    if (method === "GET") {
        const notifications = await db.collection("notifications").get();
        const notification = notifications.docs.map((doc) => ({
            id: doc.id,
            notification: doc.data(),
        }));

        res.status(200).json(notification);
    } else if (method === "POST") {
        try {
            const { id } = await db.collection("notifications").add({
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
            const notification = await db
                .collection("notifications")
                .doc(id)
                .delete();
            res.status(200).json(notification);
        } catch (error) {
            res.status(500).json(error);
        }
    } else if (method === "PUT") {
        const { id } = req.query;
        try {
            const notification = await db
                .collection("notifications")
                .doc(id)
                .update({
                    ...req.body,
                    updated: new Date().toISOString(),
                });
            res.status(200).json(notification);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(200).json({ error: "Method not allowed" });
    }
};
export default handler;