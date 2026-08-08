import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { IoCarSport } from "react-icons/io5";

import { auth, db } from "../firebase/firebase";
import Wait from "../cars/paymentLoad";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const displayName = `${data.first_name} ${data.last_name}`.trim();
      await updateProfile(user, { displayName });

      // Profile document. `role` is set here, never taken from the form —
      // otherwise anyone could register themselves as an admin.
      await setDoc(doc(db, "users", user.uid), {
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        role: "customer",
        createdAt: new Date(),
      });

      toast.success("Account created.");
      navigate("/home", { state: { message: "Welcome to RentCars!" } });
    } catch (error) {
      console.error("Registration failed:", error.code);
      toast.error(
        error.code === "auth/email-already-in-use"
          ? "That email is already registered."
          : "Could not create your account."
      );
    }
  };

  return (
    <div className="panel" data-aos="fade-up">
      <div className="text-center">
        <IoCarSport className="mx-auto text-5xl text-brand-700 dark:text-brand-400" />
        <h1 className="mt-4 text-2xl font-bold">Create your account</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          It takes less than a minute.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="first_name" className="field-label">
              First name
            </label>
            <input
              id="first_name"
              className="field-input"
              {...register("first_name", { required: "First name is required" })}
            />
            {errors.first_name && (
              <p className="field-error">{errors.first_name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="last_name" className="field-label">
              Last name
            </label>
            <input
              id="last_name"
              className="field-input"
              {...register("last_name", { required: "Last name is required" })}
            />
            {errors.last_name && (
              <p className="field-error">{errors.last_name.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="field-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="field-input"
            placeholder="you@example.com"
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
          <label htmlFor="password" className="field-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            className="field-input"
            placeholder="••••••••"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 7,
                message: "Password must be at least 7 characters",
              },
            })}
          />
          {errors.password && (
            <p className="field-error">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirm_password" className="field-label">
            Confirm password
          </label>
          <input
            id="confirm_password"
            type="password"
            autoComplete="new-password"
            className="field-input"
            placeholder="••••••••"
            {...register("confirm_password", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirm_password && (
            <p className="field-error">{errors.confirm_password.message}</p>
          )}
        </div>

        <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
          {isSubmitting ? <Wait /> : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-brand-700 hover:underline dark:text-brand-400"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;
