import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

const EmptyCart = () => {
  return (
    <div className="w-full h-max flex flex-col justify-center items-center">
      <Image
        src="/images/cart.png"
        alt="shopping-cart"
        width={300}
        height={300}
      />
      <p className="font-bold">Your cart is empty</p>
      <Link className="flex items-center" href="/">
        Burn your money now
        <ArrowLongRightIcon className="w-6 h-6 ml-3" />
      </Link>
    </div>
  );
};

export default EmptyCart;
