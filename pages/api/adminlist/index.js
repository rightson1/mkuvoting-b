import db from "../../../utils/admin";
import NextCors from "nextjs-cors";
import handleCors from "../../../handleCors";

const handler = async(req, res) => {
    const { method } = req;
    handleCors(req, res);

    if (method === "GET") {
        const admins = await db.collection("admins").get();
        const admin = admins.docs.map((doc) => doc.data());

        res.status(200).json(admin);
    } else if (method === "POST") {
        try {
            const { id } = await db.collection("admins").add({
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
            const admin = db.collection("admins").where("id", "==", id);
            admin.get().then((querySnapshot) => {
                querySnapshot.forEach(function(doc) {
                    doc.ref.delete();
                });
            });
            res.status(200).json("deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    } else if (method === "PUT") {
        const { id } = req.query;
        try {
            const admin = await db
                .collection("admins")
                .doc(id)
                .update({
                    ...req.body,
                    updated: new Date().toISOString(),
                });
            res.status(200).json(admin);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(200).json({ error: "Method not allowed" });
    }
};
export default handler;