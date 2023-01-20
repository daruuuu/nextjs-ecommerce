import React, { useContext } from "react";
import { Store } from "@/utils/Store";
import Link from "next/link";
import Layout from "@/components/Layout/Layout";
import Image from "next/image";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import EmptyCart from "@/components/EmptyCart/EmptyCart";
const CartPage = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const {
    cart: { cartItems },
  } = state;

  const removeHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link href={`products/${item.slug}`}>
                        <div className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                          &nbsp;
                          {item.name}
                        </div>
                      </Link>
                    </td>
                    <td className="p-5 text-right">{item.qty}</td>
                    <td className="p-5 text-right">${item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeHandler(item)}>
                        <XCircleIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  Your Total ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
                  : ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push("/shipping")}
                  className="primary-button w-full"
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CartPage;
