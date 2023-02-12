/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/Layout/Layout";
import ProductItem from "@/components/ProductItem/ProductItem";
import db from "@/utils/db";
import Product from "@/models/Product";
import { useContext, useState } from "react";
import { Store } from "@/utils/Store";
import axios from "axios";
import { toast } from "react-toastify";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from "next/link";

export default function Home({ productsLists, featuredProducts }) {
  const { state, dispatch } = useContext(Store);
  const [category, setCategory] = useState("");
  const featured = [];
  featuredProducts.map((product) => {
    if (product.isFeatured === true) {
      featured.push(product);
    }
  });
  const categoryList = [
    ...new Map(productsLists.map((item) => [item["category"], item])).values(),
  ];

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
      <Carousel showThumbs={false} autoPlay className="mb-4">
        {featured.map((product) => (
          <div key={product._id}>
            <Link href={`/product/${product.slug}`} passHref>
              <div className="flex">
                <img
                  style={{
                    maxHeight: "45vh",
                    width: "100%",
                    objectFit: "cover",
                  }}
                  src={product.banner}
                  alt={product.name}
                />
              </div>
            </Link>
          </div>
        ))}
      </Carousel>

      <div className="flex flex-wrap mb-4 gap-2">
        <button className="category-button" onClick={() => setCategory("")}>
          All Category
        </button>
        {categoryList.map((products) => (
          <button
            className="category-button"
            key={products.slug}
            onClick={() => setCategory(products.category)}
          >
            {products.category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {category
          ? productsLists
              .filter((product) => product.category === category)
              .map((products) => (
                <ProductItem
                  addToCartHandler={addToCartHandler}
                  product={products}
                  key={products.slug}
                ></ProductItem>
              ))
          : productsLists.map((products) => (
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
  const productsLists = JSON.parse(JSON.stringify(productsList));
  const featuredProduct = await Product.find({ isFeatured: true }).lean();
  const featuredProducts = JSON.parse(JSON.stringify(featuredProduct));
  return {
    props: {
      featuredProducts: featuredProducts.map(db.convertDocToObj),
      productsLists: productsLists.map(db.convertDocToObj),
    },
  };
};
