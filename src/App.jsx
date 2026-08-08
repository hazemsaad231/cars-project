import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Master from "./components/login/master";
import Auth from "./components/login/auth";
import Login from "./components/login/login";
import Register from "./components/login/register";
import { AdminRoute, PrivateRoute } from "./components/login/protected";

import Home from "./components/Home/Home";
import Fleet from "./components/cars/allCars";
import CarDetails from "./components/cars/carDetails";
import Complete from "./components/cars/complete";
import MyRentals from "./components/myReservations/reservations";
import AdminDashboard from "./components/orders/bookings";
import CarForm from "./components/addcar/addCar";
import NotFound from "./components/common/NotFound";
import { STRIPE_PUBLIC_KEY } from "./config";

// Created once at module scope — re-creating it on every render restarts Stripe.
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Auth />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/",
    element: <Master />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "fleet", element: <Fleet /> },
      { path: "fleet/:id", element: <CarDetails /> },
      {
        path: "my-rentals",
        element: (
          <PrivateRoute>
            <MyRentals />
          </PrivateRoute>
        ),
      },
      {
        path: "complete",
        element: (
          <PrivateRoute>
            <Complete />
          </PrivateRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: "admin/cars/new",
        element: (
          <AdminRoute>
            <CarForm />
          </AdminRoute>
        ),
      },
      {
        path: "admin/cars/:id",
        element: (
          <AdminRoute>
            <CarForm />
          </AdminRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

// Opt in early to the v7 behaviours so the console stays free of warnings.
const routerFutureFlags = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};

function App() {
  return (
    <Elements stripe={stripePromise}>
      <RouterProvider router={router} future={routerFutureFlags} />
    </Elements>
  );
}

export default App;
