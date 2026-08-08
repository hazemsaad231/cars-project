import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";

import { db } from "../firebase/firebase";
import { CARS_COLLECTION, RENTALS_COLLECTION } from "../../config";
import useApp from "../context/useApp";
import Wait from "./paymentLoad";

/** Tomorrow, as a yyyy-mm-dd string — the earliest pickup we allow. */
const tomorrow = () =>
  new Date(Date.now() + 86_400_000).toISOString().split("T")[0];

const countDays = (pickup, returnDate) => {
  if (!pickup || !returnDate) return 0;
  const diff = new Date(returnDate) - new Date(pickup);
  return diff > 0 ? Math.ceil(diff / 86_400_000) : 0;
};

const BookingForm = ({ car, carId, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { user, setCarAvailability } = useApp();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: user?.displayName ?? "",
      email: user?.email ?? "",
      phone: "",
      city: "",
      address: "",
      pickupDate: "",
      returnDate: "",
    },
  });

  const pricePerDay = Number(car.price) || 0;
  const days = countDays(watch("pickupDate"), watch("returnDate"));
  const total = days * pricePerDay;

  const onSubmit = async (data) => {
    if (!stripe || !elements) {
      toast.error("Payment is still loading, please try again.");
      return;
    }
    if (!user) {
      toast.error("Please sign in to book a car.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setSubmitting(true);
    try {
      const { error, token } = await stripe.createToken(cardElement);
      if (error) {
        toast.error(error.message);
        return;
      }

      const rentalRef = doc(collection(db, RENTALS_COLLECTION));
      const carRef = doc(db, CARS_COLLECTION, carId);
      const orderId = rentalRef.id.slice(0, 8).toUpperCase();

      /*
       * Availability is re-checked inside the transaction, so two people
       * submitting at the same time can't both rent the same car.
       */
      await runTransaction(db, async (tx) => {
        const snapshot = await tx.get(carRef);
        if (!snapshot.exists()) throw new Error("CAR_MISSING");
        if (snapshot.data().isBooked === true) throw new Error("CAR_RENTED");

        tx.update(carRef, { isBooked: true });
        tx.set(rentalRef, {
          orderId,
          userId: user.uid,
          carId,
          token: token.id,
          customer: {
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            city: data.city,
            address: data.address,
          },
          pickupDate: data.pickupDate,
          returnDate: data.returnDate,
          days,
          pricePerDay,
          total,
          car: {
            car: car.car,
            img: Array.isArray(car.img) ? car.img[0] : car.img,
            carType: car.carType ?? "",
            car_model_year: car.car_model_year ?? "",
          },
          status: "confirmed",
          createdAt: serverTimestamp(),
        });
      });

      setCarAvailability(carId, true);
      toast.success("Booking confirmed!");
      navigate("/complete", { state: { orderId, total, days } });
    } catch (error) {
      if (error.message === "CAR_RENTED") {
        toast.error("Sorry, this car was just rented by someone else.");
      } else if (error.message === "CAR_MISSING") {
        toast.error("This car is no longer available.");
      } else {
        console.error("Booking failed:", error);
        toast.error("Something went wrong. Your card was not charged.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="panel" noValidate>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Complete your booking</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {car.car} · ${pricePerDay}/day
          </p>
        </div>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-ghost px-3 py-1.5 text-xs"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Rental period */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="pickupDate" className="field-label">
            Pickup date
          </label>
          <input
            id="pickupDate"
            type="date"
            min={tomorrow()}
            className="field-input"
            {...register("pickupDate", { required: "Pickup date is required" })}
          />
          {errors.pickupDate && (
            <p className="field-error">{errors.pickupDate.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="returnDate" className="field-label">
            Return date
          </label>
          <input
            id="returnDate"
            type="date"
            min={watch("pickupDate") || tomorrow()}
            className="field-input"
            {...register("returnDate", {
              required: "Return date is required",
              validate: (value, form) =>
                countDays(form.pickupDate, value) > 0 ||
                "Return date must be after the pickup date",
            })}
          />
          {errors.returnDate && (
            <p className="field-error">{errors.returnDate.message}</p>
          )}
        </div>
      </div>

      {/* Driver details */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="field-label">
            Full name
          </label>
          <input
            id="fullName"
            className="field-input"
            {...register("fullName", { required: "Full name is required" })}
          />
          {errors.fullName && (
            <p className="field-error">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="field-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="field-input"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                message: "Please enter a valid email",
              },
            })}
          />
          {errors.email && <p className="field-error">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="field-label">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            className="field-input"
            {...register("phone", { required: "Phone is required" })}
          />
          {errors.phone && <p className="field-error">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="city" className="field-label">
            City
          </label>
          <input
            id="city"
            className="field-input"
            {...register("city", { required: "City is required" })}
          />
          {errors.city && <p className="field-error">{errors.city.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="address" className="field-label">
            Delivery address
          </label>
          <input
            id="address"
            className="field-input"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <p className="field-error">{errors.address.message}</p>
          )}
        </div>
      </div>

      {/* Card */}
      <div className="mt-6">
        <span className="field-label">Card details</span>
        <div className="rounded-lg border border-slate-300 bg-white p-3.5 dark:border-slate-700">
          <CardElement options={{ hidePostalCode: true }} />
        </div>
        <p className="mt-2 text-xs text-slate-400">
          Test mode — use card 4242 4242 4242 4242.
        </p>
      </div>

      {/* Total */}
      <dl className="mt-6 space-y-2 rounded-xl bg-slate-50 p-4 text-sm dark:bg-slate-800/60">
        <div className="flex justify-between">
          <dt className="text-slate-500 dark:text-slate-400">Daily rate</dt>
          <dd className="font-medium">${pricePerDay}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500 dark:text-slate-400">Rental days</dt>
          <dd className="font-medium">{days || "—"}</dd>
        </div>
        <div className="flex justify-between border-t border-slate-200 pt-2 text-base dark:border-slate-700">
          <dt className="font-semibold">Total</dt>
          <dd className="font-bold text-brand-700 dark:text-brand-400">
            ${total}
          </dd>
        </div>
      </dl>

      <button
        type="submit"
        className="btn-primary mt-6 w-full"
        disabled={!stripe || submitting}
      >
        {submitting ? <Wait /> : `Pay $${total}`}
      </button>
    </form>
  );
};

export default BookingForm;
