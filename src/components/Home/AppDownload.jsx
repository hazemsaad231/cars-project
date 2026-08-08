import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import android from "../../assets/img/andriod.png";
import ios from "../../assets/img/ios.png";
import phone from "../../assets/img/iPhone.png";

const AppDownload = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { name: "", phone: "", email: "" } });

  const onSubmit = () => {
    // No backend yet — confirm receipt and clear the form.
    toast.success("Thanks! We will call you back shortly.");
    reset();
  };

  return (
    <section id="get-in-touch" className="container-page section" data-aos="fade-up">
      <div className="grid items-center gap-12 rounded-3xl bg-slate-50 px-6 py-12 sm:px-10 lg:grid-cols-2 dark:bg-slate-900/50">
        <div>
          <h2 className="section-title">Download the RentCars app</h2>
          <p className="section-subtitle">
            Faster booking, saved payment details and app-only deals.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <img src={ios} alt="Download on the App Store" className="h-12 w-auto" />
            <img src={android} alt="Get it on Google Play" className="h-12 w-auto" />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 max-w-sm space-y-4"
            noValidate
          >
            <h3 className="text-lg font-semibold">Or let us call you</h3>

            <div>
              <label htmlFor="cb-name" className="field-label">
                Name
              </label>
              <input
                id="cb-name"
                className="field-input"
                placeholder="Your name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="field-error">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="cb-phone" className="field-label">
                Phone number
              </label>
              <input
                id="cb-phone"
                type="tel"
                className="field-input"
                placeholder="+20 100 000 0000"
                {...register("phone", { required: "Phone number is required" })}
              />
              {errors.phone && <p className="field-error">{errors.phone.message}</p>}
            </div>

            <div>
              <label htmlFor="cb-email" className="field-label">
                Email
              </label>
              <input
                id="cb-email"
                type="email"
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

            <button type="submit" className="btn-primary w-full">
              Send
            </button>
          </form>
        </div>

        <div className="hidden justify-center lg:flex">
          <img
            src={phone}
            alt="RentCars mobile app"
            loading="lazy"
            className="h-auto w-64 drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
