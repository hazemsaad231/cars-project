import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

/** End of the current month — so the banner never expires into all zeros. */
const endOfMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).getTime();
};

const breakdown = (msLeft) => {
  const safe = Math.max(msLeft, 0);
  return {
    Days: Math.floor(safe / 86_400_000),
    Hours: Math.floor((safe % 86_400_000) / 3_600_000),
    Minutes: Math.floor((safe % 3_600_000) / 60_000),
    Seconds: Math.floor((safe % 60_000) / 1000),
  };
};

const OfferCountdown = () => {
  // Computed once per mount — recomputing it each render restarted the timer.
  const target = useMemo(endOfMonth, []);
  const [timeLeft, setTimeLeft] = useState(() => breakdown(target - Date.now()));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(breakdown(target - Date.now())), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <section className="container-page section" data-aos="fade-up">
      <div className="rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 px-6 py-14 text-center text-white sm:px-12">
        <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
          Limited time
        </span>

        <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold sm:text-4xl">
          Get 20% off every rental this month
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-brand-100">
          The discount is applied automatically at checkout on most cars in the
          fleet.
        </p>

        <div
          aria-live="polite"
          className="mx-auto mt-10 grid max-w-lg grid-cols-4 gap-3 sm:gap-5"
        >
          {Object.entries(timeLeft).map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl bg-white/10 px-2 py-4 backdrop-blur"
            >
              <div className="text-2xl font-bold tabular-nums sm:text-4xl">
                {String(value).padStart(2, "0")}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-brand-200 sm:text-xs">
                {label}
              </div>
            </div>
          ))}
        </div>

        <Link
          to="/fleet"
          className="btn mt-10 bg-white text-brand-700 hover:bg-brand-50"
        >
          Claim the offer
        </Link>
      </div>
    </section>
  );
};

export default OfferCountdown;
