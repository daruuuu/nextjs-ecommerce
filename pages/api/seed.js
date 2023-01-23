import db from "@/utils/db";
import User from "@/models/Users";
import Product from "@/models/Product";
import data from "@/utils/data";

const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Product.deleteMany();
  await Product.insertMany(data.productsList);
  await db.disconnect();
  res.send({ message: "seeded" });
};

export default handler;
