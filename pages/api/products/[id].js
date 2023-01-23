import Product from "@/models/Product";
import db from "@/utils/db";

const handler = async (req, res) => {
  await db.connect();
  const productData = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(productData);
};

export default handler;
