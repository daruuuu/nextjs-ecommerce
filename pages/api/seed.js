import db from "@/utils/db";
import User from "@/models/Users";
import data from "@/utils/data";

const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await db.disconnect();
  res.send({ message: "seeded" });
};

export default handler;
