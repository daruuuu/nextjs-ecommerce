import React, { useEffect, useReducer } from "react";
import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import Loading from "@/components/Loading/Loading";
import { orderReducer } from "@/utils/reducer";
import axios from "axios";
import { getError } from "@/utils/error";
import AdminLayout from "@/components/Layout/AdminLayout";

const AdminOrders = () => {
  const [{ loading, orders, error }, dispatch] = useReducer(orderReducer, {
    loading: true,
    orders: [],
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get("/api/admin/orders");
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchData();
  }, []);

  return (
    <Layout title="Admin Dashboard">
      <AdminLayout title="Admin Orders">
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
                  <th className="p-5 text-left">USER</th>
                  <th className="p-5 text-left">DATE</th>
                  <th className="p-5 text-left">TOTAL</th>
                  <th className="p-5 text-left">PAID</th>
                  <th className="p-5 text-left">DELIVERED</th>
                  <th className="p-5 text-left">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="p-5">{order._id.substring(20, 25)}</td>
                    <td className="p-5">
                      {order.user ? order.user.name : "DELETED USER"}
                    </td>
                    <td className="p-5">{order.createdAt.substring(0, 10)}</td>
                    <td className="p-5">${order.totalPrice}</td>
                    <td className="p-5">
                      {order.isPaid
                        ? `${order.paidAt.substring(0, 10)}`
                        : "NOT PAID"}
                    </td>
                    <td className="p-5">
                      {order.isDelivered
                        ? `${order.deliveredAt.substring(0, 10)}`
                        : "NOT DELIVERED"}
                    </td>
                    <td className="p-5">
                      <Link href={`/order/${order._id}`}>
                        <div>Details</div>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminLayout>
    </Layout>
  );
};

AdminOrders.auth = { adminOnly: true };
export default AdminOrders;
