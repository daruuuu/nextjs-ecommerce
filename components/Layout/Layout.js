import React from "react";
import Head from "next/head";
import Link from "next/link";

const Layout = (props) => {
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
            <Link href="">
              <p className="text-lg font-bold">Larola</p>
            </Link>
            <div>
              <Link href="/cart">
                <p className="p-2 inline">Cart</p>
              </Link>
              <Link href="/login">
                <p className="p-2 inline">Login</p>
              </Link>
            </div>
          </nav>
        </header>
        <main className="container mb-auto mt-4 px-4">{props.children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          Larola
        </footer>
      </div>
    </>
  );
};

export default Layout;
