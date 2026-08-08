import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import heroPattern from "../../assets/img/color.png";

const stats = [
  { value: "120+", label: "Cars in the fleet" },
  { value: "24/7", label: "Roadside support" },
  { value: "4.9", label: "Average rating" },
];

// The section needs an explicit background: the blend modes below blend
// against it, and a transparent backdrop would leave the image's white in.
const Hero = () => (
  <section className="relative isolate overflow-hidden bg-white dark:bg-slate-950">
    {/*
      Decorative graphic, full-bleed behind the hero.
      Light: `multiply` drops the image's white out and leaves the blue shape.
      Dark:  inverting flips white to black (which `screen` drops out) and
             hue-rotate puts the shape back to blue instead of orange.
    */}
    <div
      aria-hidden="true"
      style={{ backgroundImage: `url(${heroPattern})` }}
      className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat mix-blend-multiply dark:mix-blend-screen dark:invert dark:hue-rotate-180 dark:brightness-[1.8]"
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
