import { Link } from "react-router-dom";
import { TbCarOff } from "react-icons/tb";

const NotFound = () => (
  <div className="container-page section flex flex-col items-center text-center">
    <TbCarOff className="mb-6 text-7xl text-brand-700 dark:text-brand-400" />
    <h1 className="text-4xl font-bold">Page not found</h1>
    <p className="mt-3 max-w-md text-slate-500 dark:text-slate-400">
      The page you are looking for does not exist or has been moved.
    </p>
    <Link to="/home" className="btn-primary mt-8">
      Back to home
    </Link>
  </div>
);

export default NotFound;
