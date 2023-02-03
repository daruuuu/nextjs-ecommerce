import { getSession } from "next-auth/react";
import db from "@/utils/db";
import Users from "@/models/Users";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const deleteHandler = async (req, res) => {
    await db.connect();
    const user = await Users.findById(req.query.id);
    if (user) {
      if (user.email === "admin@admin.com") {
        return res.status(400).send({ message: "Can not delete admin" });
      }
      await user.remove();
      await db.disconnect();
      res.send({ message: "User Deleted" });
    } else {
      await db.disconnect();
      res.status(404).send({ message: "User Not Found" });
    }
  };
  if (req.method === "DELETE") {
    return deleteHandler(req, res);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};

export default handler;
