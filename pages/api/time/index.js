import db from "../../../utils/db";
import NextCors from "nextjs-cors";
import handleCors from "../../../handleCors";

const handler = async (req, res) => {
  const { method } = req;
  handleCors(req, res);

  if (method === "GET") {
    const times = await db.collection("times").get();
    const time = times.docs.map((doc) => ({ id: doc.id, time: doc.data() }));

    return res.status(200).json(time[0]);
  } else if (method === "POST") {
    try {
      const { id } = await db.collection("times").add({
        ...req.body,
      });
      return res.status(200).json({ id });
    } catch (e) {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } else if (method === "PUT") {
    const { id } = req.query;
    try {
      const result = await db.collection("times").doc(id).update({
        date: req.body.date,
      });
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.status(400).json({ e });
    }
  }
};
export default handler;
