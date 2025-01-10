import { createContext, useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc} from "firebase/firestore";
import { db } from "../firebase/firebase";


export const Context = createContext(null);


const ContextProvider = (props) => {


   const [orderList, setOrderList] = useState([])

    const getData = async() => {
        try {
            const response = await getDocs(collection(db,"orders"));
            const orders = response.docs.map((doc) =>( {
                id: doc.id,
                ...doc.data()}))
            setOrderList(orders);
        }
        catch (error) {

        }
    }




    useEffect(() => {
    getData()
    }, [])  
  

   const [isDarkMode, setIsDarkMode] = useState(false);

   const toggleMode = () => {
     if (isDarkMode) {
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
       document.body.style.transition = 'background-color 0.7s ease, color 0.7s ease';
      
     } else {
       document.body.style.backgroundColor = 'black';
       document.body.style.color = 'white';
       document.body.style.transition = 'background-color 0.7s ease, color 0.7s ease';
     }
     setIsDarkMode(!isDarkMode); // تحديث الحالة
   };

   const [Cars, setCars] = useState([]);
   const fetchCars = async () => {
     const Allcars = await getDocs(collection(db, "cars"));
     const carsList = Allcars.docs.map((doc) => ({
       isNaNd: doc.id,
       ...doc.data()
     }));
     setCars(carsList);
     console.log(carsList);
     localStorage.setItem("cars", JSON.stringify(carsList));
   };
 
   useEffect(() => {
     fetchCars();
   }, []);





const handleBook = async (id, isBooked) => {
  try {
    const carRef = doc(db,"cars", id);
    await updateDoc(carRef, { isBooked: !isBooked });
    fetchCars();  
  } catch (error) {
    console.error("Error booking car: ", error);
   
  }
}


    return (
        <>
        <Context.Provider value={{orderList, isDarkMode, toggleMode, handleBook , Cars}}>{props.children}</Context.Provider>
        </>
    )
}

export default ContextProvider



