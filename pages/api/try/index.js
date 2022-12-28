const handler = async(req, res) => {
    if (req.method === "GET") {
        return res.status(200).send({ error: "A GET REQUEST" });
    }
    if (req.method === "PUT") {
        return res.status(200).json({ error: "A PUT" });
    } else {
        return res.status(200).json({ error: "Method not allowed" });
    }
};
export default handler;