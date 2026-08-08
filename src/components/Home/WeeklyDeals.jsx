import { Link } from "react-router-dom";
import { weeklyDeals } from "./data";

const WeeklyDeals = () => (
  <section className="container-page section" data-aos="fade-up">
    <div className="text-center">
      <h2 className="section-title">Deals of the week</h2>
      <p className="section-subtitle mx-auto text-center">
        Discounted daily rates on three of our most requested cars.
      </p>
    </div>

    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {weeklyDeals.map((deal) => (
        <article key={deal.id} className="card flex h-full flex-col">
          <div className="aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img
              src={deal.img}
              alt={deal.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
            />
          </div>

          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-xl font-bold text-brand-700 dark:text-brand-400">
              {deal.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {deal.text}
            </p>

            <div className="mt-6 flex items-end gap-3">
              <span className="text-2xl font-bold text-brand-700 dark:text-brand-400">
                ${deal.newPrice}
              </span>
              <span className="pb-1 text-sm text-slate-400 line-through">
                ${deal.price}
              </span>
              <span className="pb-1 text-sm text-slate-500 dark:text-slate-400">
                / day
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>

    <div className="mt-12 flex justify-center">
      <Link to="/fleet" className="btn-outline">
        See the full fleet
      </Link>
    </div>
  </section>
);

export default WeeklyDeals;
