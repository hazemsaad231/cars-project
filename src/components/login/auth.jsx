import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useApp from "../context/useApp";

/** Centred shell for the sign-in / sign-up screens. */
const Auth = () => {
  const { isDarkMode } = useApp();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-950">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
      <ToastContainer
        limit={2}
        autoClose={2500}
        position="top-right"
        theme={isDarkMode ? "dark" : "light"}
      />
    </div>
  );
};

export default Auth;
