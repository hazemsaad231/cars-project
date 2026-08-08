import { ColorRing } from "react-loader-spinner";

/** Small inline spinner used inside buttons while a request is in flight. */
const Wait = () => (
  <ColorRing
    visible
    height="24"
    width="24"
    ariaLabel="submitting"
    colors={["#ffffff", "#e2e8f0", "#ffffff", "#e2e8f0", "#ffffff"]}
  />
);

export default Wait;
