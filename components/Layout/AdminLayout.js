import React from "react";
import AdminNav from "../AdminNav/AdminNav";

const AdminLayout = (props) => {
  return (
    <div className="grid md:grid-cols-4 md:gap-5">
      <AdminNav />
      <div className="overflow-x-auto md:col-span-3">
        <h1 className="mb-4 text-xl">{props.title}</h1>
        {props.children}
      </div>
    </div>
  );
};

export default AdminLayout;
