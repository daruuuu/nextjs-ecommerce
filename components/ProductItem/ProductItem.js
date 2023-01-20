Link; /* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

const ProductItem = ({ product }) => {
  return (
    <div className="card">
      <Link href={`/products/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow max-h-80 w-full object-cover"
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/products/${product.slug}}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <button className="primary-button" type="button">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
