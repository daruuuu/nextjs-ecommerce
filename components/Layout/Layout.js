import React, { useContext, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Store } from "@/utils/Store";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Menu } from "@headlessui/react";
import DropdownLink from "@/components/DropdownLink/DropdownLink";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Layout = (props) => {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { cart } = state;
  const [cartItemsTotal, setCartItemsTotal] = useState(0);

  useEffect(() => {
    setCartItemsTotal(cart.cartItems.reduce((a, b) => a + b.qty, 0));
  }, [cart.cartItems]);

  const logoutHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_CLEAR" });
    signOut({ callbackUrl: "/login" });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };
  return (
    <>
      <Head>
        <title>{props.title ? props.title + "- Larola" : "Larola"}</title>
        <meta name="description" content="Ecommerce next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="top-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-16 items-center px-4 justify-between shadow-md">
            <Link href="/">
              <p className="text-lg font-bold">Larola</p>
            </Link>
            <form
              onSubmit={submitHandler}
              className="mx-auto hidden w-full justify-center md:flex"
            >
              <input
                type="text"
                className="rounder-tr-none rounded-br-none p-1 text-sm focus:ring-0"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search product"
              />
              <button className="rounded rounded-tl-none rounded-bl-none bg-amber-300 p-1 text-sm dark:text-black">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </form>
            <div className="flex">
              <Link href="/cart">
                <p className="p-2 ">
                  Cart
                  {cartItemsTotal > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsTotal}
                    </span>
                  )}
                </p>
              </Link>
              {status === "loading" ? (
                <p className="p-2 ">Loading...</p>
              ) : session?.user ? (
                <Menu as="p" className="relative inline-block z-50">
                  <Menu.Button className="p-2">{session.user.name}</Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-md ">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order/history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    {session.user.isAdmin && (
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/admin/dashboard"
                        >
                          Admin Dashboard
                        </DropdownLink>
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logoutHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login">
                  <p className="p-2 primary-button ">Login</p>
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container mx-auto mb-auto mt-4 px-4">
          {props.children}
        </main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          Larola
        </footer>
      </div>
    </>
  );
};

export default Layout;
