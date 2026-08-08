import { Link } from "react-router-dom";
import CarCard from "../cars/CarCard";
import useApp from "../context/useApp";

const CardSkeleton = () => (
  <div className="card animate-pulse">
    <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-800" />
    <div className="space-y-3 p-5">
      <div className="h-5 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
      <div className="h-4 rounded bg-slate-200 dark:bg-slate-800" />
      <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
      <div className="h-10 rounded bg-slate-200 dark:bg-slate-800" />
    </div>
  </div>
);

const PopularCars = () => {
  const { cars, carsLoading } = useApp();
  const featured = cars.slice(0, 4);

  return (
    <section className="container-page section" data-aos="fade-up">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="section-title">Most popular cars</h2>
          <p className="section-subtitle">
            The cars our customers book the most, ready to drive today.
          </p>
        </div>
        <Link to="/fleet" className="btn-outline">
          View all cars
        </Link>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {carsLoading
          ? Array.from({ length: 4 }, (_, i) => <CardSkeleton key={i} />)
          : featured.map((car) => <CarCard key={car.id} car={car} />)}
      </div>

      {!carsLoading && featured.length === 0 && (
        <p className="mt-10 text-center text-slate-500 dark:text-slate-400">
          No cars available yet.
        </p>
      )}
    </section>
  );
};

export default PopularCars;
