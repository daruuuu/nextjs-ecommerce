import React, { useEffect, useReducer, useState } from "react";
import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import Loading from "@/components/Loading/Loading";
import { userReducer } from "@/utils/reducer";
import axios from "axios";
import { getError } from "@/utils/error";
import AdminLayout from "@/components/Layout/AdminLayout";
import { toast } from "react-toastify";
import Modal from "@/components/Modal/Modal";

const AdminUsers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [{ loading, users, error, successDelete, loadingDelete }, dispatch] =
    useReducer(userReducer, {
      loading: true,
      users: [],
      error: "",
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get("/api/admin/users");
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    }
    fetchData();
  }, [successDelete]);

  const deleteHandler = async (userId) => {
    setIsOpen(true);
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/admin/users/${userId}`);
      setIsOpen(false);
      dispatch({ type: "DELETE_SUCCESS" });
      toast.success("User deleted successfully");
    } catch (err) {
      setIsOpen(false);
      dispatch({ type: "DELETE_FAIL" });
      toast.error(getError(err));
      console.log(getError(err));
    }
  };

  return (
    <Layout title="Admin Dashboard">
      <AdminLayout title="Admin Users">
        {loadingDelete && <div>Deleting item...</div>}
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
                  <th className="p-5 text-left">EMAIL</th>
                  <th className="p-5 text-left">ADMIN</th>
                  <th className="p-5 text-left">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b">
                    <td className=" p-5 ">{user._id.substring(20, 24)}</td>
                    <td className=" p-5 ">{user.name}</td>
                    <td className=" p-5 ">{user.email}</td>
                    <td className=" p-5 ">{user.isAdmin ? "YES" : "NO"}</td>
                    <td className=" p-5 ">
                      <Link href={`/admin/product/${user._id}`}>Edit | </Link>
                      <button onClick={() => setIsOpen(true)}>Delete</button>
                    </td>
                    <Modal
                      isOpen={isOpen}
                      closeModal={() => setIsOpen(false)}
                      onDelete={() => deleteHandler(user._id)}
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

AdminUsers.auth = { adminOnly: true };
export default AdminUsers;
