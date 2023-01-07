import db from "../../../utils/db";
import NextCors from "nextjs-cors";
import handleCors from "../../../handleCors";

const handler = async(req, res) => {
    const { method } = req;
    await handleCors(req, res);

    if (method === "GET") {
        const events = await db.collection("events").get();
        const event = events.docs.map((doc) => doc.data());

        res.status(200).json(event);
    } else if (method === "POST") {
        db.collection("events")
            .add({
                ...req.body,
                created: new Date().toISOString(),
            })
            .then(() => {
                res.status(200).json("added");
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    } else if (method === "DELETE") {
        const { id } = req.query;
        try {
            const event = db.collection("events").where("id", "==", id);
            event.get().then((querySnapshot) => {
                querySnapshot.forEach(function(doc) {
                    doc.ref.delete();
                });
            });
            res.status(200).json("deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(200).json({ error: "Method not allowed" });
    }
};
export default handler;