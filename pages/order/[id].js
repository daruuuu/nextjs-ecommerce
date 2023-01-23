import Layout from "@/components/Layout/Layout";
import { getError } from "@/utils/error";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_ORDER_REQUEST": {
      return { ...state, loading: true, error: "" };
    }
    case "FETCH_ORDER_SUCCESS": {
      return { ...state, loading: false, order: action.payload, error: "" };
    }
    case "FETCH_ORDER_FAIL": {
      return { ...state, loading: false, error: action.payload };
    }
    default:
      state;
  }
};

const Order = () => {
  const { query } = useRouter();
  const orderId = query.id;

  const [{ loading, order, error }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  console.log(order);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_ORDER_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: "FETCH_ORDER_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_ORDER_FAIL", payload: getError(err) });
      }
    };
    if (!orderId || order._id !== orderId) {
      fetchOrder();
    }
  }, [order, orderId]);

  const {
    shippingAddress,
    isDelivered,
    deliveredAt,
    paymentMethod,
    isPaid,
    paidAt,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = order;

  console.log(shippingAddress);

  return (
    <Layout title={`Order ${orderId}`}>
      <h1 className="mb-4 text-xl">{`Order ${orderId}`}</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Shipping Address</h2>
              <div>
                {shippingAddress.fullName}, {shippingAddress.address},{" "}
                {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                {shippingAddress.country}, {shippingAddress.phone}
              </div>
              {isDelivered ? (
                <div className="alert-success">Delivered at {deliveredAt}</div>
              ) : (
                <div className="alert-error">Not Delivered</div>
              )}
            </div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Payment Method</h2>
              <div>{paymentMethod}</div>
              {isPaid ? (
                <div className="alert-success">Paid at {paidAt}</div>
              ) : (
                <div className="alert-error">Not Paid</div>
              )}
            </div>
            <div className="card p-5 overflow-x-auto">
              <h2 className="mb-2 text-lg">Order Items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item) => (
                    <tr key={item._id} className="border-b">
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
                      <td className="p-5 text-right">
                        ${item.price * item.qty}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Order Summary</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Items</div>
                    <div>${itemsPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Tax</div>
                    <div>${taxPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Shipping</div>
                    <div>${shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Total</div>
                    <div>${totalPrice}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

Order.auth = true;

export default Order;
