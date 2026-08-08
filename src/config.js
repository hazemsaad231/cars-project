// Single place for the values that used to be copy-pasted across components.

/**
 * The account allowed into the admin dashboard.
 * NOTE: this is a convenience check for the UI only. The authoritative rule
 * belongs in Firestore security rules — anything enforced here can be bypassed
 * from the browser console.
 */
export const ADMIN_EMAIL = "hazemsaad231@gmail.com";

export const STRIPE_PUBLIC_KEY =
  "pk_test_51QFwLTBBBCgBrYZETIOQg6jU8b6FNOuHyjGPeIWliPqSeYXqTbJkV8QYxeNHqUMCyzf5m4meV3J3HX1m7mMEEWVj00Hz8287JJ";

/** Firestore collections. */
export const CARS_COLLECTION = "cars";
export const RENTALS_COLLECTION = "rentals";
