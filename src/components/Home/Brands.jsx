import { brands } from "./data";

const Brands = () => (
  <section className="container-page section" data-aos="fade-up">
    <div className="text-center">
      <h2 className="section-title">Popular brands</h2>
      <p className="section-subtitle mx-auto text-center">
        We rent from the manufacturers you already trust.
      </p>
    </div>

    <ul className="mt-12 grid grid-cols-2 items-center gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-8">
      {brands.map(({ id, icon: Icon, title }) => (
        <li key={id} className="flex flex-col items-center gap-3">
          <Icon
            aria-hidden
            className="text-5xl text-brand-700 transition duration-300 hover:scale-110 sm:text-6xl dark:text-brand-400"
          />
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {title}
          </span>
        </li>
      ))}
    </ul>
  </section>
);

export default Brands;
