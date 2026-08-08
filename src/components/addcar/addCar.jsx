import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

import { db } from "../firebase/firebase";
import { CARS_COLLECTION } from "../../config";
import useApp from "../context/useApp";
import Loader from "../load/Load";
import Wait from "../cars/paymentLoad";

const TEXT_FIELDS = [
  { name: "car", label: "Car name", placeholder: "BMW X5", required: true },
  { name: "carType", label: "Body type", placeholder: "SUV", required: true },
  { name: "car_color", label: "Colour", placeholder: "Black", required: true },
  { name: "car_model_year", label: "Model year", placeholder: "2024", required: true },
  { name: "Transmission", label: "Transmission", placeholder: "Automatic", required: true },
  { name: "Horsepower", label: "Horsepower", placeholder: "375 hp", required: true },
  { name: "mileage", label: "Mileage", placeholder: "12,000 km", required: true },
  { name: "evaluation", label: "Rating (0–5)", placeholder: "4.8", required: false },
  { name: "reviews", label: "Number of reviews", placeholder: "126", required: false },
];

const CarForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refreshCars } = useApp();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { car: "", img: "", price: "", isBooked: false },
  });

  const loadCar = useCallback(async () => {
    if (!isEditing) return;
    try {
      const snapshot = await getDoc(doc(db, CARS_COLLECTION, id));
      if (!snapshot.exists()) {
        toast.error("That car no longer exists.");
        navigate("/fleet", { replace: true });
        return;
      }
      const data = snapshot.data();
      Object.entries(data).forEach(([key, value]) => {
        setValue(key, Array.isArray(value) ? value.join(", ") : value);
      });
    } catch (error) {
      console.error("Error loading car:", error);
      toast.error("Could not load this car.");
    } finally {
      setLoading(false);
    }
  }, [id, isEditing, navigate, setValue]);

  useEffect(() => {
    loadCar();
  }, [loadCar]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      img: data.img
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean),
      price: Number(data.price),
      isBooked: Boolean(data.isBooked),
    };

    try {
      if (isEditing) {
        await updateDoc(doc(db, CARS_COLLECTION, id), payload);
      } else {
        await addDoc(collection(db, CARS_COLLECTION), payload);
      }
      await refreshCars();
      toast.success(isEditing ? "Car updated." : "Car added.");
      navigate("/fleet");
    } catch (error) {
      console.error("Error saving car:", error);
      toast.error("Could not save this car.");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container-page section">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 text-center">
          <h1 className="section-title">
            {isEditing ? "Update car" : "Add a new car"}
          </h1>
          <p className="section-subtitle mx-auto text-center">
            Prices are the daily rental rate.
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="panel" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            {TEXT_FIELDS.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="field-label">
                  {field.label}
                  {field.required && <span className="text-red-500"> *</span>}
                </label>
                <input
                  id={field.name}
                  className="field-input"
                  placeholder={field.placeholder}
                  {...register(
                    field.name,
                    field.required
                      ? { required: `${field.label} is required` }
                      : {}
                  )}
                />
                {errors[field.name] && (
                  <p className="field-error">{errors[field.name].message}</p>
                )}
              </div>
            ))}

            <div>
              <label htmlFor="price" className="field-label">
                Price per day ($)<span className="text-red-500"> *</span>
              </label>
              <input
                id="price"
                type="number"
                min="0"
                step="1"
                className="field-input"
                placeholder="120"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0, message: "Price cannot be negative" },
                })}
              />
              {errors.price && <p className="field-error">{errors.price.message}</p>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="img" className="field-label">
                Image URLs<span className="text-red-500"> *</span>
              </label>
              <textarea
                id="img"
                rows="3"
                className="field-input resize-y"
                placeholder="https://…/front.jpg, https://…/side.jpg"
                {...register("img", {
                  required: "At least one image URL is required",
                })}
              />
              <p className="mt-1 text-xs text-slate-400">
                Separate multiple URLs with commas. The first one is the cover.
              </p>
              {errors.img && <p className="field-error">{errors.img.message}</p>}
            </div>

            <label className="flex cursor-pointer items-center gap-3 sm:col-span-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                {...register("isBooked")}
              />
              <span className="text-sm font-medium">
                Mark this car as currently rented
              </span>
            </label>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? <Wait /> : isEditing ? "Save changes" : "Add car"}
            </button>
            <button
              type="button"
              className="btn-outline"
              onClick={() => navigate("/fleet")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarForm;
