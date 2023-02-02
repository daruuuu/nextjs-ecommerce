import React, { useEffect, useReducer, useState } from "react";
import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import Loading from "@/components/Loading/Loading";
import { useRouter } from "next/router";
import { productReducer } from "@/utils/reducer";
import axios from "axios";
import { getError } from "@/utils/error";
import AdminLayout from "@/components/Layout/AdminLayout";
import { toast } from "react-toastify";
import Modal from "@/components/Modal/Modal";

const AdminProducts = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [
    { loading, products, error, loadingCreate, successDelete, loadingDelete },
    dispatch,
  ] = useReducer(productReducer, {
    loading: true,
    products: [],
    error: "",
  });

  const createHandler = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(`/api/admin/products`);
      dispatch({ type: "CREATE_SUCCESS" });
      router.push(`/admin/product/${data.product._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(err));
    }
  };

  const deleteHandler = async (productId) => {
    setIsOpen(true);
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/admin/products/${productId}`);
      dispatch({ type: "DELETE_SUCCESS" });
      setIsOpen(false);
      toast.success("Product deleted successfully");
      router.reload(window.location.pathname);
    } catch (err) {
      setIsOpen(false);
      dispatch({ type: "DELETE_FAIL" });
      toast.error(getError(err));
    }
  };

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
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [successDelete]);

  return (
    <Layout title="Admin Dashboard">
      <AdminLayout title="Admin Products">
        <div className="flex justify-between">
          <h1 className="mb-4 text-xl">Products</h1>
          {loadingDelete && <div>Deleting item...</div>}
          <button
            disabled={loadingCreate}
            onClick={createHandler}
            className="primary-button"
          >
            {loadingCreate ? "Loading" : "Create"}
          </button>
        </div>
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
                        Edit |{" "}
                      </Link>
                      <button onClick={() => setIsOpen(true)}>Delete</button>
                    </td>
                    <Modal
                      isOpen={isOpen}
                      closeModal={() => setIsOpen(false)}
                      onDelete={() => deleteHandler(product._id)}
                    />
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
