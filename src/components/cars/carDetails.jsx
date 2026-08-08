import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { FaStar, FaUserAlt } from "react-icons/fa";
import {
  TbAirConditioning,
  TbCalendar,
  TbGauge,
  TbHorseshoe,
  TbManualGearbox,
  TbPaint,
} from "react-icons/tb";

import { db } from "../firebase/firebase";
import { CARS_COLLECTION } from "../../config";
import useApp from "../context/useApp";
import Loader from "../load/Load";
import BookingForm from "./payment";
import NotFound from "../common/NotFound";
import CarImage from "../common/CarImage";
import { formatPrice } from "../../utils/price";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin } = useApp();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const snapshot = await getDoc(doc(db, CARS_COLLECTION, id));
        if (!active) return;
        if (snapshot.exists()) {
          const data = snapshot.data();
          setCar(data);
          setMainImage(Array.isArray(data.img) ? data.img[0] : data.img);
        }
      } catch (error) {
        console.error("Error fetching car:", error);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) return <Loader />;
  if (!car) return <NotFound />;

  const images = Array.isArray(car.img) ? car.img : [car.img].filter(Boolean);
  const isRented = car.isBooked === true || car.isBooked === "true";

  const specs = [
    { Icon: TbCalendar, label: "Model year", value: car.car_model_year },
    { Icon: TbManualGearbox, label: "Transmission", value: car.Transmission },
    { Icon: TbHorseshoe, label: "Horsepower", value: car.Horsepower },
    { Icon: TbGauge, label: "Mileage", value: car.mileage },
    { Icon: TbPaint, label: "Colour", value: car.car_color },
    { Icon: FaUserAlt, label: "Seats", value: "4" },
    { Icon: TbAirConditioning, label: "Air conditioning", value: "Yes" },
  ].filter((spec) => spec.value);

  const handleRentClick = () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: `/fleet/${id}` } });
      return;
    }
    setBooking(true);
  };

  return (
    <div className="container-page section">
      <nav className="mb-6 break-words text-xs text-slate-500 sm:mb-8 sm:text-sm dark:text-slate-400">
        <Link to="/fleet" className="hover:text-brand-700 dark:hover:text-brand-400">
          Our fleet
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700 dark:text-slate-200">{car.car}</span>
      </nav>

      <div className="grid gap-8 sm:gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div className="min-w-0">
          <div className="aspect-[4/3] overflow-hidden rounded-xl bg-slate-100 sm:rounded-2xl dark:bg-slate-800">
            <CarImage
              src={mainImage}
              alt={car.car}
              iconClass="text-7xl"
              className="h-full w-full object-cover"
            />
          </div>

          {images.length > 1 && (
            <div className="custom-scroll mt-3 flex gap-2 overflow-x-auto pb-2 sm:mt-4 sm:gap-3">
              {images.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setMainImage(img)}
                  aria-label={`View image ${index + 1}`}
                  className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-20 sm:w-28 ${
                    mainImage === img
                      ? "border-brand-600"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <CarImage src={img} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="min-w-0">
          <span className={isRented ? "badge-rented" : "badge-available"}>
            {isRented ? "Currently rented" : "Available now"}
          </span>

          <h1 className="mt-3 break-words text-2xl font-bold sm:mt-4 sm:text-4xl">
            {car.car}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
            {car.carType && <span>{car.carType}</span>}
            {car.evaluation && (
              <span className="flex items-center gap-1 font-semibold text-amber-500">
                <FaStar />
                {car.evaluation}
                {car.reviews && (
                  <span className="font-normal text-slate-500 dark:text-slate-400">
                    ({car.reviews} reviews)
                  </span>
                )}
              </span>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-end gap-2 sm:mt-6">
            <span className="text-3xl font-bold text-brand-700 sm:text-4xl dark:text-brand-400">
              ${formatPrice(car.price)}
            </span>
            <span className="pb-1 text-slate-500 sm:pb-1.5 dark:text-slate-400">
              per day
            </span>
          </div>

          {car.description && (
            <p className="mt-5 text-sm leading-relaxed text-slate-500 sm:mt-6 dark:text-slate-400">
              {car.description}
            </p>
          )}

          <dl className="mt-7 grid grid-cols-1 gap-x-6 gap-y-4 min-[420px]:grid-cols-2 sm:mt-8 sm:gap-y-5">
            {specs.map(({ Icon, label, value }) => (
              <div key={label} className="flex min-w-0 items-center gap-3">
                <Icon className="shrink-0 text-xl text-brand-700 dark:text-brand-400" />
                <div className="min-w-0">
                  <dt className="text-xs text-slate-500 dark:text-slate-400">
                    {label}
                  </dt>
                  <dd className="break-words text-sm font-semibold">{value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
            {isAdmin ? (
              <Link to={`/admin/cars/${id}`} className="btn-primary w-full sm:w-auto">
                Edit this car
              </Link>
            ) : isRented ? (
              <button
                type="button"
                className="btn-primary w-full sm:w-auto"
                disabled
              >
                Currently rented
              </button>
            ) : (
              !booking && (
                <button
                  type="button"
                  onClick={handleRentClick}
                  className="btn-primary w-full sm:w-auto"
                >
                  Rent this car
                </button>
              )
            )}
            <Link to="/fleet" className="btn-outline w-full sm:w-auto">
              Back to fleet
            </Link>
          </div>

          {!isLoggedIn && !isRented && !isAdmin && (
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              You will be asked to sign in first.
            </p>
          )}
        </div>
      </div>

      {/* Booking form */}
      {booking && !isRented && (
        <div className="mt-10 sm:mt-14" data-aos="fade-up">
          <BookingForm
            car={car}
            carId={id}
            onCancel={() => setBooking(false)}
          />
        </div>
      )}
    </div>
  );
};

export default CarDetails;
