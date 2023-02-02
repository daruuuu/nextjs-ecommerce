import Layout from "@/components/Layout/Layout";
import Loading from "@/components/Loading/Loading";
import Link from "next/link";
import React, { useReducer, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { getError } from "@/utils/error";
import { dashboardReducer } from "@/utils/reducer";
import AdminLayout from "@/components/Layout/AdminLayout";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const AdminDashboard = () => {
  const [{ loading, summary, error }, dispatch] = useReducer(dashboardReducer, {
    loading: true,
    summary: { salesData: [] },
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get("/api/admin/summary");
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  const data = {
    labels: summary.salesData.map((x) => x._id),
    datasets: [
      {
        label: "Sales",
        data: summary.salesData.map((x) => x.totalSales),
        backgroundColor: "rgba(162, 222, 208, 1)",
      },
    ],
  };

  return (
    <Layout title="Admin Dashboard">
      <AdminLayout title="Admin Dashboard">
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="alert-error">{error}</div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4">
              <div className="card p-5 m-5">
                <p className="text-3xl">${summary.ordersPrice}</p>
                <p>Sales</p>
                <Link href="/admin/orders">View Sales</Link>
              </div>
              <div className="card p-5 m-5">
                <p className="text-3xl">${summary.ordersCount}</p>
                <p>Orders</p>
                <Link href="/admin/orders">View Orders</Link>
              </div>
              <div className="card p-5 m-5">
                <p className="text-3xl">${summary.productsCount}</p>
                <p>Products</p>
                <Link href="/admin/products">View Products</Link>
              </div>
              <div className="card p-5 m-5">
                <p className="text-3xl">${summary.usersCount}</p>
                <p>Users</p>
                <Link href="/admin/users">View Users</Link>
              </div>
            </div>
            <h2 className="text-xl">Sales Report</h2>
            <Bar
              options={{
                legend: { display: "true", position: "right" },
              }}
              data={data}
            />
          </div>
        )}
      </AdminLayout>
    </Layout>
  );
};

AdminDashboard.auth = { adminOnly: true };
export default AdminDashboard;
