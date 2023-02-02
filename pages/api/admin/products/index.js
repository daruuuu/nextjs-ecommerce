import Product from "@/models/Product";
import db from "@/utils/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const postHandler = async (req, res) => {
    await db.connect();
    const newProduct = new Product({
      name: "sample name",
      slug: "sample-name-" + Math.random(),
      image: "/images/shirt1.jpg",
      price: 0,
      category: "sample category",
      brand: "sample brand",
      countInStock: 0,
      description: "sample description",
      rating: 0,
      numReviews: 0,
    });
    const product = await newProduct.save();
    await db.disconnect();
    res.send({ message: "Create product success", product });
  };
  if (req.method === "GET") {
    await db.connect();
    const products = await Product.find({});
    await db.disconnect();
    res.send(products);
  } else if (req.method === "POST") {
    return postHandler(req, res);
  } else {
    return res.status(405).send({ message: "Method not allowed" });
  }
};

export default handler;
