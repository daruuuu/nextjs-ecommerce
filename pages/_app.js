import Loading from "@/components/Loading/Loading";
import "@/styles/globals.css";
import { StoreProvider } from "@/utils/Store";
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
        {Component.auth ? (
          <Auth adminOnly={Component.auth.adminOnly}>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </StoreProvider>
    </SessionProvider>
  );
}

const Auth = ({ children, adminOnly }) => {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=You must login first");
    },
  });
  if (status === "loading") {
    return <Loading />;
  }
  if (adminOnly && !session.user.isAdmin) {
    router.push("/unauthorized?message=You are not authorized");
  }
  return children;
};
