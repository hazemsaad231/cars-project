import { useContext } from "react";
import { Context } from "./AppContext";

/** Convenience accessor for the app-wide context (theme, auth, cars). */
export default function useApp() {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useApp must be used inside <ContextProvider>");
  }
  return context;
}
