import { useEffect, useState } from "react";
import { TbCarOff } from "react-icons/tb";

/**
 * Car photo with a graceful fallback.
 *
 * Several image URLs in Firestore are dead hotlinks, so a bare <img> renders
 * as an empty box. This swaps in a placeholder as soon as the load fails.
 */
const CarImage = ({ src, alt = "", className = "", iconClass = "text-3xl" }) => {
  const [failed, setFailed] = useState(false);

  // A new src deserves a fresh attempt.
  useEffect(() => setFailed(false), [src]);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt ? `${alt} — image unavailable` : "Image unavailable"}
        className={`flex items-center justify-center bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600 ${className}`}
      >
        <TbCarOff className={iconClass} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};

export default CarImage;
