import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import heroPattern from "../../assets/img/color.png";

const stats = [
  { value: "120+", label: "Cars in the fleet" },
  { value: "24/7", label: "Roadside support" },
  { value: "4.9", label: "Average rating" },
];

const Hero = () => (
  <section className="relative isolate overflow-hidden">
    {/*
      Decorative graphic — used to tile behind the whole app, now scoped to
      the hero. `multiply` drops the white out over the light background;
      in dark mode it falls back to a faint watermark instead.
    */}
    <div
      aria-hidden="true"
      style={{ backgroundImage: `url(${heroPattern})` }}
      className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-3/5 max-w-2xl bg-[length:auto_115%] bg-right bg-no-repeat mix-blend-multiply sm:block dark:opacity-[0.07] dark:mix-blend-normal"
    />

    <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
      <div>
        <span className="eyebrow">Car rental made easy</span>

        <h1 className="mt-5 text-4xl font-extrabold leading-tight text-brand-700 sm:text-5xl lg:text-6xl dark:text-brand-400">
          Find, book and rent a car easily
        </h1>

        <p className="mt-5 max-w-xl text-base text-slate-500 sm:text-lg dark:text-slate-400">
          Pick your dates, choose a car and drive away. Transparent daily
          pricing, free cancellation and delivery wherever you need it.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/fleet" className="btn-primary">
            Browse the fleet
            <FaArrowRight />
          </Link>
          <a href="#contact" className="btn-outline">
            Talk to us
          </a>
        </div>

        <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-2xl font-bold text-brand-700 sm:text-3xl dark:text-brand-400">
                {stat.value}
              </dt>
              <dd className="mt-1 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div>
        <img
          src="/car.webp"
          alt="Rental car"
          id="hero-car"
          width="720"
          height="480"
          loading="eager"
        />
      </div>
    </div>
  </section>
);

export default Hero;
