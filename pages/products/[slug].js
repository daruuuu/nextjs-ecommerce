import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "@/components/Layout/Layout";
import React, { useContext } from "react";
import data from "../../utils/data.js";
import { Store } from "../../utils/Store";
import {
  ArrowUturnLeftIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

const ProductDetail = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { slug } = router.query;

  const productData = data.productsList.find((x) => x.slug === slug);

  if (!productData) {
    return <div>Product Not Found</div>;
  }

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find(
      (x) => x.slug === productData.slug
    );
    const qty = existItem ? existItem.qty + 1 : 1;

    if (productData.countInStock < qty) {
      alert("Sorry. Product is out of stock");
      return;
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...productData, qty } });
    router.push("/cart");
  };

  return (
    <Layout title={productData.name}>
      <div className="py-2">
        <Link href="/">
          <ArrowUturnLeftIcon className="h-6 w-6" />
        </Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={productData.image}
            alt={productData.name}
            responsive
            width={540}
            height={540}
            className="shadow-lg rounded-md"
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{productData.name}</h1>
            </li>
            <li>Category: {productData.category}</li>
            <li>Brand: {productData.brand}</li>
            <li>
              {productData.rating} of {productData.numReviews} reviews
            </li>
            <li>Description: {productData.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${productData.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>
                {productData.countInStock > 0 ? "In Stock" : "Unavailable"}
              </div>
            </div>
            <button
              className="primary-button w-full flex justify-center"
              onClick={addToCartHandler}
            >
              <ShoppingCartIcon className="h-6 w-6 mr-2" />
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
