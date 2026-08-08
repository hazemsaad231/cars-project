import { createContext } from "react";

/**
 * App-wide context (theme, auth, cars).
 * Lives in its own module so the provider file only exports a component
 * and React Fast Refresh keeps working.
 */
export const Context = createContext(null);

export default Context;
