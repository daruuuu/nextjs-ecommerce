import Order from "@/models/Order";
import db from "@/utils/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    res.status(401).send({ message: "Unauthorized" });
  }

  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const deliveredOrder = await order.save();
    await db.disconnect();
    res.send({
      order: deliveredOrder,
      message: "Order Delivered",
    });
  } else {
    await db.disconnect();
    return res.status(404).send({ message: "Order Not Found" });
  }
};

export default handler;
