import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { Store } from "@/utils/Store";

const Layout = (props) => {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <>
      <Head>
        <title>{props.title ? props.title + "- Larola" : "Larola"}</title>
        <meta name="description" content="Ecommerce next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/">
              <p className="text-lg font-bold">Larola</p>
            </Link>
            <div className="flex">
              <Link href="/cart">
                <p className="p-2 ">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cart.cartItems.reduce((a, b) => a + b.qty, 0)}{" "}
                    </span>
                  )}
                </p>
              </Link>
              <Link href="/login">
                <p className="p-2 ">Login</p>
              </Link>
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
