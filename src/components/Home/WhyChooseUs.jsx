import { MdOutlineHeadsetMic, MdOutlinePriceCheck } from "react-icons/md";
import { TbClockHour4 } from "react-icons/tb";

const reasons = [
  {
    Icon: MdOutlinePriceCheck,
    title: "Best price guaranteed",
    text: "Find a lower daily rate elsewhere and we will refund the difference.",
  },
  {
    Icon: TbClockHour4,
    title: "24-hour car delivery",
    text: "Book any car at any time and we will bring it to your address.",
  },
  {
    Icon: MdOutlineHeadsetMic,
    title: "24/7 technical support",
    text: "Have a question on the road? Our team answers day and night.",
  },
];

const WhyChooseUs = () => (
  <section className="container-page section" data-aos="fade-up">
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <div>
        <span className="eyebrow">Why choose us</span>
        <h2 className="section-title mt-5">We offer the best experience</h2>
        <p className="section-subtitle">
          Everything about renting with us is designed to be quick, clear and
          free of paperwork.
        </p>

        <ul className="mt-10 space-y-7">
          {reasons.map(({ Icon, title, text }) => (
            <li key={title} className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-2xl text-brand-700 dark:bg-brand-500/10 dark:text-brand-400">
                <Icon />
              </span>
              <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div data-aos="zoom-in">
        {/* Served from /public so the 14 MB file never enters the JS bundle. */}
        <video
          src="/showreel.mp4"
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          className="aspect-square w-full rounded-3xl object-cover shadow-xl"
        />
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
