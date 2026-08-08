import { useCallback, useEffect, useMemo, useState } from "react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { ADMIN_EMAIL, CARS_COLLECTION } from "../../config";
import { Context } from "./AppContext";

/** Light is the default; only an explicit previous choice turns dark on. */
const readStoredTheme = () => {
  try {
    return localStorage.getItem("theme") === "dark";
  } catch {
    return false;
  }
};

const ContextProvider = ({ children }) => {
  /* ------------------------------------------------------------------ theme */
  const [isDarkMode, setIsDarkMode] = useState(readStoredTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleMode = useCallback(() => setIsDarkMode((prev) => !prev), []);

  /* ------------------------------------------------------------------- auth */
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthReady(true);
    });
    return unsubscribe;
  }, []);

  const logout = useCallback(() => signOut(auth), []);

  /* ------------------------------------------------------------------- cars */
  const [cars, setCars] = useState([]);
  const [carsLoading, setCarsLoading] = useState(true);

  const refreshCars = useCallback(async () => {
    setCarsLoading(true);
    try {
      const snapshot = await getDocs(collection(db, CARS_COLLECTION));
      setCars(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setCarsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCars();
  }, [refreshCars]);

  /**
   * Flip a car between rented and available.
   * Writes to Firestore first, then patches local state — no refetch needed.
   */
  const setCarAvailability = useCallback(async (carId, isRented) => {
    if (!carId) return;
    try {
      await updateDoc(doc(db, CARS_COLLECTION, carId), { isBooked: isRented });
      setCars((prev) =>
        prev.map((car) =>
          car.id === carId ? { ...car, isBooked: isRented } : car
        )
      );
    } catch (error) {
      console.error("Error updating car availability:", error);
    }
  }, []);

  const value = useMemo(
    () => ({
      // theme
      isDarkMode,
      toggleMode,
      // auth
      user,
      authReady,
      isLoggedIn: Boolean(user),
      isAdmin: user?.email === ADMIN_EMAIL,
      logout,
      // cars
      cars,
      carsLoading,
      refreshCars,
      setCarAvailability,
    }),
    [
      isDarkMode,
      toggleMode,
      user,
      authReady,
      logout,
      cars,
      carsLoading,
      refreshCars,
      setCarAvailability,
    ]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ContextProvider;
