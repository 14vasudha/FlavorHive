import Footer from "./Footer";
import { Suspense } from "react";
import Header from "./Header";
import { Outlet, ScrollRestoration, useLocation } from "@tanstack/react-router";
import { Bounce, ToastContainer } from "react-toastify";
import React from "react";
import "react-toastify/dist/ReactToastify.css";

const DefaultLayout = () => {
  const TanStackRouterDevtools = import.meta.env.PROD
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      );

  const location = useLocation();
  const isLoginRoute = location.pathname.includes("sign-in");

  return (
    <>
      <ScrollRestoration />
      <Header />
      <div
        className={`mt-12 flex min-h-screen w-screen flex-col lg:mt-16 ${isLoginRoute ? "bg-slate-50" : ""}`}
      >
        <Outlet />
        <Footer />
      </div>
      <Suspense>
        <TanStackRouterDevtools initialIsOpen={false} position="bottom-left" />
      </Suspense>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
};

export default DefaultLayout;
