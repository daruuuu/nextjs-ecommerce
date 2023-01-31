import Product from "@/models/Product";
import db from "@/utils/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  if (req.method === "GET") {
    await db.connect();
    const products = await Product.find({});
    await db.disconnect();
    res.send(products);
  } else {
    return res.status(405).send({ message: "Method not allowed" });
  }
};

export default handler;
