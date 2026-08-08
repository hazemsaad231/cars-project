import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Aos from "aos";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import useApp from "../context/useApp";

/** Scrolls back to the top whenever the route changes. */
const useScrollToTop = () => {
  const { pathname } = useLocation();
  // Block body on purpose: an implicit return hands React a non-function
  // value, which it then tries to call as the cleanup on unmount.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

const Master = () => {
  const { isDarkMode } = useApp();
  useScrollToTop();

  useEffect(() => {
    Aos.init({ duration: 800, once: true, offset: 60 });
  }, []);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {/* One toast host for the whole app instead of one per page. */}
      <ToastContainer
        limit={2}
        autoClose={2500}
        position="top-right"
        theme={isDarkMode ? "dark" : "light"}
      />
    </div>
  );
};

export default Master;
