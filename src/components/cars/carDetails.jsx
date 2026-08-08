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
      <nav className="mb-8 text-sm text-slate-500 dark:text-slate-400">
        <Link to="/fleet" className="hover:text-brand-700 dark:hover:text-brand-400">
          Our fleet
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700 dark:text-slate-200">{car.car}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
            <CarImage
              src={mainImage}
              alt={car.car}
              iconClass="text-7xl"
              className="h-full w-full object-cover"
            />
          </div>

          {images.length > 1 && (
            <div className="custom-scroll mt-4 flex gap-3 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setMainImage(img)}
                  aria-label={`View image ${index + 1}`}
                  className={`h-20 w-28 shrink-0 overflow-hidden rounded-lg border-2 transition ${
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
        <div>
          <span className={isRented ? "badge-rented" : "badge-available"}>
            {isRented ? "Currently rented" : "Available now"}
          </span>

          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{car.car}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
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

          <div className="mt-6 flex items-end gap-2">
            <span className="text-4xl font-bold text-brand-700 dark:text-brand-400">
              ${car.price}
            </span>
            <span className="pb-1.5 text-slate-500 dark:text-slate-400">
              per day
            </span>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
            {specs.map(({ Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className="shrink-0 text-xl text-brand-700 dark:text-brand-400" />
                <div>
                  <dt className="text-xs text-slate-500 dark:text-slate-400">
                    {label}
                  </dt>
                  <dd className="text-sm font-semibold">{value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            {isAdmin ? (
              <Link to={`/admin/cars/${id}`} className="btn-primary">
                Edit this car
              </Link>
            ) : isRented ? (
              <button type="button" className="btn-primary" disabled>
                Currently rented
              </button>
            ) : (
              !booking && (
                <button
                  type="button"
                  onClick={handleRentClick}
                  className="btn-primary"
                >
                  Rent this car
                </button>
              )
            )}
            <Link to="/fleet" className="btn-outline">
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
        <div className="mt-14" data-aos="fade-up">
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
