import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { IoCarSport } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa6";

import { auth } from "../firebase/firebase";
import Wait from "../cars/paymentLoad";

const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const redirectTo = state?.from ?? "/home";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: "", password: "" } });

  // onAuthStateChanged in the context picks the session up automatically.
  const finish = () =>
    navigate(redirectTo, { state: { message: "Signed in successfully." } });

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      finish();
    } catch (error) {
      console.error("Sign-in failed:", error.code);
      toast.error("Email or password is incorrect.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      finish();
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") return;
      console.error("Google sign-in failed:", error);
      toast.error("Could not sign in with Google.");
    }
  };

  return (
    <div className="panel" data-aos="fade-up">
      <div className="text-center">
        <IoCarSport className="mx-auto text-5xl text-brand-700 dark:text-brand-400" />
        <h1 className="mt-4 text-2xl font-bold">Welcome back</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Sign in to book your next car.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4" noValidate>
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
            autoComplete="current-password"
            className="field-input"
            placeholder="••••••••"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="field-error">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
          {isSubmitting ? <Wait /> : "Sign in"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        <span className="text-xs uppercase tracking-wider text-slate-400">or</span>
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="btn w-full border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <FaGoogle />
        Continue with Google
      </button>

      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        No account yet?{" "}
        <Link
          to="/login/register"
          className="font-semibold text-brand-700 hover:underline dark:text-brand-400"
        >
          Create one
        </Link>
      </p>
    </div>
  );
};

export default Login;
