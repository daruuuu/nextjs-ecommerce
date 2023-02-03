import { getSession } from "next-auth/react";
import db from "@/utils/db";
import Users from "@/models/Users";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  await db.connect();
  const users = await Users.find({});
  await db.disconnect();
  res.send(users);
};

export default handler;
