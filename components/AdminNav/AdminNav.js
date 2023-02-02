import Link from "next/link";
import React from "react";

const AdminNav = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href="/admin/dashboard">
            <p className="font-bold">Dashboard</p>
          </Link>
        </li>
        <li>
          <Link href="/admin/orders">
            <p className="font-bold">Orders</p>
          </Link>
        </li>
        <li>
          <Link href="/admin/products">
            <p className="font-bold">Products</p>
          </Link>
        </li>
        <li>
          <Link href="/admin/users">
            <p className="font-bold">Users</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminNav;
