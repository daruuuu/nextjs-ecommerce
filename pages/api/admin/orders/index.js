import Order from "@/models/Order";
import db from "@/utils/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    res.status(401).send({ message: "Unauthorized" });
  }

  if (req.method === "GET") {
    await db.connect();
    const orders = await Order.find({}).populate("user", "name");
    await db.disconnect();
    res.send(orders);
  } else {
    return res.status(405).send({ message: "Method not allowed" });
  }
};

export default handler;