import { useMemo } from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { testimonials } from "./data";

const Testimonials = () => {
  const settings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 2 } },
        { breakpoint: 640, settings: { slidesToShow: 1 } },
      ],
    }),
    []
  );

  return (
    <section className="section bg-slate-50 dark:bg-slate-900/50" data-aos="fade-up">
      <div className="container-page">
        <div className="text-center">
          <h2 className="section-title">What our renters say</h2>
          <p className="section-subtitle mx-auto text-center">
            Real reviews from people who booked through RentCars.
          </p>
        </div>

        <div className="mt-12 [&_.slick-dots]:!bottom-[-2.5rem] [&_.slick-list]:!overflow-visible">
          <Slider {...settings}>
            {testimonials.map((item) => (
              <div key={item.id} className="h-full px-3">
                <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div
                    className="flex gap-1 text-amber-500"
                    aria-label={`${item.stars} out of 5 stars`}
                  >
                    {Array.from({ length: item.stars }, (_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>

                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    “{item.quote}”
                  </blockquote>

                  <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">
                    <img
                      src={item.image}
                      alt=""
                      loading="lazy"
                      width="48"
                      height="48"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-semibold">{item.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {item.role}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
