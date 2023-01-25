import bycryptjs from "bcryptjs";
import User from "@/models/Users";
import db from "@/utils/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  if (req.method !== "PUT") {
    return res.status(400).send({ message: "Method not allowed" });
  }
  const session = await getSession({ req });
  if (!session) {
    res.status(401).send({ message: "Unauthorized" });
  }
  const { user } = session;
  const { name, email, password } = req.body;
  if (
    !name ||
    !email ||
    !email.includes("@") ||
    (password && password.trim().length < 6)
  ) {
    res.status(422).json({ message: "Validation failed." });
    return;
  }
  await db.connect();
  const updateUser = await User.findById(user._id);
  updateUser.name = name;
  updateUser.email = email;
  if (password) {
    updateUser.password = bycryptjs.hashSync(password);
  }
  await updateUser.save();
  await db.disconnect();
  res.send({ message: "User updated successfully!" });
};

export default handler;
