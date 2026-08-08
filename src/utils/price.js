/**
 * Prices in Firestore are stored as strings with thousands separators
 * ("37,584", "6,500") rather than numbers. `Number("37,584")` is NaN and
 * `parseFloat("37,584")` is 37, so every arithmetic use needs this first.
 */
export const parsePrice = (value) => {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  // Drop everything that isn't a digit or a decimal point.
  const parsed = parseFloat(String(value ?? "").replace(/[^\d.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

/** Render a price with thousands separators, e.g. 37584 -> "37,584". */
export const formatPrice = (value) =>
  parsePrice(value).toLocaleString("en-US", { maximumFractionDigits: 2 });
