import { Link } from "react-router-dom";
import { FaUserAlt, FaStar } from "react-icons/fa";
import { TbAirConditioning, TbCalendar, TbManualGearbox } from "react-icons/tb";
import CarImage from "../common/CarImage";
import { formatPrice } from "../../utils/price";

/**
 * One car in the fleet grid.
 *
 * @param car      car document ({ id, car, img[], carType, price, ... })
 * @param actions  optional footer replacement (used by the admin grid)
 */
const CarCard = ({ car, actions }) => {
  const isRented = car.isBooked === true || car.isBooked === "true";
  const cover = Array.isArray(car.img) ? car.img[0] : car.img;

  return (
    <article className="card flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <CarImage
          src={cover}
          alt={car.car}
          iconClass="text-5xl"
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
        <span
          className={`absolute left-3 top-3 ${
            isRented ? "badge-rented" : "badge-available"
          }`}
        >
          {isRented ? "Rented" : "Available"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold leading-tight">{car.car}</h3>
          {car.evaluation && (
            <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-amber-500">
              <FaStar />
              {car.evaluation}
            </span>
          )}
        </div>

        {/* Cars migrated from the old offers list have no year/gearbox, so
            only render the rows that actually have a value. */}
        <dl className="mt-4 grid grid-cols-2 gap-y-2.5 text-sm text-slate-500 dark:text-slate-400">
          {[
            { Icon: FaUserAlt, value: "4 seats" },
            { Icon: TbAirConditioning, value: "A/C" },
            { Icon: TbManualGearbox, value: car.Transmission || car.carType },
            { Icon: TbCalendar, value: car.car_model_year },
          ]
            .filter((spec) => spec.value)
            .map(({ Icon, value }) => (
              <div key={value} className="flex items-center gap-2">
                <Icon className="shrink-0 text-base" />
                <dd className="truncate">{value}</dd>
              </div>
            ))}
        </dl>

        <div className="mt-5 flex items-end justify-between border-t border-slate-200 pt-4 dark:border-slate-800">
          <div>
            <span className="text-2xl font-bold text-brand-700 dark:text-brand-400">
              ${formatPrice(car.price)}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {" "}
              / day
            </span>
          </div>
        </div>

        <div className="mt-4">
          {actions ?? (
            <Link
              to={`/fleet/${car.id}`}
              className={isRented ? "btn-outline w-full" : "btn-primary w-full"}
            >
              {isRented ? "View details" : "Rent now"}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default CarCard;
