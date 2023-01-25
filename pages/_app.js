import "@/styles/globals.css";
import { StoreProvider } from "@/utils/Store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <NextNProgress color="linear-gradient(90deg, #b656cb, #10a1a0)" />
        <PayPalScriptProvider deferLoading={true}>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </PayPalScriptProvider>
      </StoreProvider>
    </SessionProvider>
  );
}

const Auth = ({ children }) => {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=You must login first");
    },
  });
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  return children;
};
