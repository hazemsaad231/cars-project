import { Rings } from "react-loader-spinner";

/** Full-height page loader. */
const Loader = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <Rings
      visible
      height="80"
      width="80"
      color="#1d4ed8"
      ariaLabel="loading"
    />
  </div>
);

export default Loader;
