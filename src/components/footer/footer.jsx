import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLocationArrow,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoCarSport } from "react-icons/io5";

const columns = [
  {
    title: "Company",
    items: ["About us", "Careers", "Press centre", "Investor relations"],
  },
  {
    title: "Rentals",
    items: ["Our fleet", "Long-term rental", "Corporate plans", "Packages"],
  },
  {
    title: "Support",
    items: ["Help centre", "Rental guides", "Partner network", "Contact us"],
  },
];

const socials = [
  { Icon: FaFacebookF, label: "Facebook", hover: "hover:text-blue-500" },
  { Icon: FaTwitter, label: "Twitter", hover: "hover:text-sky-400" },
  { Icon: FaInstagram, label: "Instagram", hover: "hover:text-pink-500" },
];

const Footer = () => (
  <footer
    id="contact"
    className="mt-auto bg-slate-900 text-slate-300 dark:bg-slate-900"
  >
    <div className="container-page py-14">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
        {/* Brand + contact details */}
        <div className="lg:col-span-2">
          <Link to="/home" className="flex items-center gap-3">
            <IoCarSport className="text-4xl text-brand-400" />
            <span className="text-xl font-bold text-white">RENTCARS</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            Book a car in minutes. Transparent daily pricing, free cancellation
            and delivery to your door.
          </p>

          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <FaLocationArrow className="shrink-0 text-brand-400" />
              <span>25 Talaat Harb St, Downtown, Cairo</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="shrink-0 text-brand-400" />
              <a href="tel:+201000000000" className="hover:text-white">
                +20 100 000 0000
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MdOutlineEmail className="shrink-0 text-lg text-brand-400" />
              <a href="mailto:hello@rentcars.com" className="hover:text-white">
                hello@rentcars.com
              </a>
            </li>
          </ul>
        </div>

        {/* Link columns */}
        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              {column.title}
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {column.items.map((item) => (
                <li key={item} className="cursor-pointer hover:text-white">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center gap-6 border-t border-slate-800 pt-8 sm:flex-row sm:justify-between">
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} RentCars. All rights reserved.
        </p>
        <div className="flex gap-5">
          {socials.map(({ Icon, label, hover }) => (
            <a
              key={label}
              href="#contact"
              aria-label={label}
              className={`text-lg text-slate-400 transition ${hover}`}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
