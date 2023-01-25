import Layout from "@/components/Layout/Layout";
import Loading from "@/components/Loading/Loading";
import { getError } from "@/utils/error";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useReducer } from "react";

const orderhistoryreducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        orderHistory: action.payload,
        error: "",
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
};

const OrderHistory = () => {
  const [{ loading, error, orderHistory }, dispatch] = useReducer(
    orderhistoryreducer,
    {
      loading: true,
      orderHistory: [],
      error: "",
    }
  );

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get("/api/orders/history");
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchOrderHistory();
  }, []);
  return (
    <Layout title="Order History">
      <h1 className="mb-4 text-xl">Order History</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="px-5 text-left">ID</th>
                <th className="p-5 text-left">DATE</th>
                <th className="p-5 text-left">TOTAL</th>
                <th className="p-5 text-left">PAID</th>
                <th className="p-5 text-left">DELIVERED</th>
                <th className="p-5 text-left">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="p-5">{order._id.substring(20, 24)}</td>
                  <td className="p-5">{order.createdAt.substring(0, 10)}</td>
                  <td className="p-5">${order.totalPrice}</td>
                  <td className="p-5">
                    {order.isPaid
                      ? `${order.paidAt.substring(0, 10)}`
                      : "not paid"}
                  </td>
                  <td className="p-5">
                    {order.isDelivered
                      ? `${order.deliveredAt.substring(0, 10)}`
                      : "not delivered"}
                  </td>
                  <td className="p-5">
                    <Link href={`/order/${order._id}`}>
                      <p className="flex items-center">
                        Details
                        <ArrowLongRightIcon className="w-6 h-6 ml-3" />
                      </p>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

OrderHistory.auth = true;
export default OrderHistory;
