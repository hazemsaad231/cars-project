import { Link, Navigate, useLocation } from "react-router-dom";
import { GrCompliance } from "react-icons/gr";

const Complete = () => {
  const { state } = useLocation();

  // Reached without booking anything — nothing to confirm.
  if (!state?.orderId) return <Navigate to="/fleet" replace />;

  const { orderId, total, days } = state;

  return (
    <div className="container-page section flex justify-center">
      <div className="panel w-full max-w-lg text-center">
        <GrCompliance size={72} className="mx-auto text-emerald-500" />

        <h1 className="mt-6 text-2xl font-bold">Booking confirmed</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          We have emailed you the details. The car will be ready on your pickup
          date.
        </p>

        <dl className="mt-8 space-y-3 rounded-xl bg-slate-50 p-5 text-sm dark:bg-slate-800/60">
          <div className="flex justify-between">
            <dt className="text-slate-500 dark:text-slate-400">Booking number</dt>
            <dd className="font-mono font-semibold">{orderId}</dd>
          </div>
          {days != null && (
            <div className="flex justify-between">
              <dt className="text-slate-500 dark:text-slate-400">Rental days</dt>
              <dd className="font-semibold">{days}</dd>
            </div>
          )}
          {total != null && (
            <div className="flex justify-between">
              <dt className="text-slate-500 dark:text-slate-400">Total paid</dt>
              <dd className="font-bold text-brand-700 dark:text-brand-400">
                ${total}
              </dd>
            </div>
          )}
        </dl>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/my-rentals" className="btn-primary">
            View my rentals
          </Link>
          <Link to="/home" className="btn-outline">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Complete;
