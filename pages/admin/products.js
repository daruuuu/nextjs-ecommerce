import React, { useEffect, useReducer } from "react";
import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import Loading from "@/components/Loading/Loading";
import { productReducer } from "@/utils/reducer";
import axios from "axios";
import { getError } from "@/utils/error";
import AdminLayout from "@/components/Layout/AdminLayout";

const AdminProducts = () => {
  const [{ loading, products, error }, dispatch] = useReducer(productReducer, {
    loading: true,
    products: [],
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get("/api/admin/products");
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchData();
  }, []);

  return (
    <Layout title="Admin Dashboard">
      <AdminLayout title="Admin Products">
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
                  <th className="p-5 text-left">NAME</th>
                  <th className="p-5 text-left">PRICE</th>
                  <th className="p-5 text-left">CATEGORY</th>
                  <th className="p-5 text-left">COUNT</th>
                  <th className="p-5 text-left">RATINGS</th>
                  <th className="p-5 text-left">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b">
                    <td className="p-5">{product._id.substring(20, 25)}</td>
                    <td className="p-5">{product.name}</td>
                    <td className="p-5">${product.price}</td>
                    <td className="p-5">{product.category}</td>
                    <td className="p-5">{product.countInStock}</td>
                    <td className="p-5">{product.rating}</td>
                    <td className="p-5">
                      <Link href={`/admin/product/${product._id}`}>
                        Edit | <button>Delete</button>
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

AdminProducts.auth = { adminOnly: true };
export default AdminProducts;
