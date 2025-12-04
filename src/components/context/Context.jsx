import { createContext, useEffect, useState, useCallback, useMemo } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import i18n from '../../i18n'; 






export const Context = createContext(null);

const ContextProvider = ({ children }) => {
  const [orderList, setOrderList] = useState([]);
  const [Cars, setCars] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem("isDarkMode");
    return stored !== null ? JSON.parse(stored) : true; // default to dark mode
  });

  // ✅ تحميل البيانات مرة واحدة فقط
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getDocs(collection(db, "orders"));
        const orders = response.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrderList(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    getData();
  }, []);

  // ✅ جلب بيانات السيارات - وتحزينها محليًا لتقليل الفتش المتكرر
  useEffect(() => {
    const fetchCars = async () => {
      const storedCars = localStorage.getItem("cars");
      if (storedCars) {
        setCars(JSON.parse(storedCars));
      } else {
        try {
          const allCars = await getDocs(collection(db, "cars"));
          const carsList = allCars.docs.map((doc) => ({
            id: doc.id, // تعديل هنا
            ...doc.data(),
          }));
          setCars(carsList);
          localStorage.setItem("cars", JSON.stringify(carsList));
        } catch (error) {
          console.error("Error fetching cars:", error);
        }
      }
    };
    fetchCars();
  }, []);

  // ✅ تحسين toggleMode باستخدام useCallback
  // Apply body styles and persist preference whenever `isDarkMode` changes
  useEffect(() => {
    document.body.style.transition = "background-color 0.7s ease, color 0.7s ease";
    document.body.style.backgroundColor = isDarkMode ? "black" : "white";
    document.body.style.color = isDarkMode ? "white" : "black";
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  // ✅ تحسين handleBook لمنع fetch غير ضروري
  const handleBook = useCallback(
    async (id, isBooked) => {
      try {
        const carRef = doc(db, "cars", id);
        await updateDoc(carRef, { isBooked: !isBooked });

        // تحديث الـ state يدويًا بدلاً من جلب البيانات من جديد
        setCars((prevCars) =>
          prevCars.map((car) =>
            car.id === id ? { ...car, isBooked: !isBooked } : car
          )
        );
        localStorage.setItem("cars", JSON.stringify(Cars));
      } catch (error) {
        console.error("Error booking car:", error);
      }
    },
    [Cars]
  );
   const [select, setSelect] = useState(false); 
    const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelect(!select);
  };




  return (
    <Context.Provider value={{ orderList, isDarkMode, toggleMode, handleBook, Cars ,changeLanguage, select}}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
