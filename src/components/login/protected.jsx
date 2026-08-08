import { Navigate } from "react-router-dom";
import useApp from "../context/useApp";
import Loader from "../load/Load";

/** Blocks a route until Firebase has told us whether someone is signed in. */
export function PrivateRoute({ children }) {
  const { authReady, isLoggedIn } = useApp();

  if (!authReady) return <Loader />;
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

/** Admin-only route. Still client-side — Firestore rules are the real gate. */
export function AdminRoute({ children }) {
  const { authReady, isAdmin } = useApp();

  if (!authReady) return <Loader />;
  return isAdmin ? children : <Navigate to="/home" replace />;
}

export default PrivateRoute;
