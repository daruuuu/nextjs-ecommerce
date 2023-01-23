import Layout from "@/components/Layout/Layout";
import ProductItem from "@/components/ProductItem/ProductItem";
import db from "@/utils/db";
import Product from "@/models/Product";
import { useContext } from "react";
import { Store } from "@/utils/Store";
import axios from "axios";
import { toast } from "react-toastify";

export default function Home({ productsList }) {
  const { state, dispatch } = useContext(Store);

  const addToCartHandler = async (productData) => {
    const existItem = state.cart.cartItems.find(
      (x) => x.slug === productData.slug
    );
    const qty = existItem ? existItem.qty + 1 : 1;
    const { data } = await axios.get(`/api/products/${productData._id}`);

    if (data.countInStock < qty) {
      return toast.error("Sorry. Product is out of stock");
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...productData, qty } });
    toast.success("Success added product");
  };

  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productsList.map((products) => (
          <ProductItem
            addToCartHandler={addToCartHandler}
            product={products}
            key={products.slug}
          ></ProductItem>
        ))}
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  await db.connect();
  const productsList = await Product.find().lean();
  return {
    props: {
      productsList: productsList.map(db.convertDocToObj),
    },
  };
};
