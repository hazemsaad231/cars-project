import { useParams } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Payment from "./payment";
import Loader from "../load/Load";
import { Context } from '../context/Context';
import { useContext } from "react";

const BuyDetails = () => {
  
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useContext(Context);


  const fetchCarDetails = useCallback(async () => {
    const docRef = doc(db, "cars", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCarDetails({ ...docSnap.data(), id: docSnap.id }); // تضمين doc.id داخل بيانات السيارة
      setLoading(false);
      localStorage.setItem("carDetails", JSON.stringify({ ...docSnap.data(), id: docSnap.id }));
      
    } else {
      console.log("No such document!");
    }
  }, [id]);


  useEffect(() => {
    fetchCarDetails();
  }, [id]);


  
  return (
    <>
      {loading ? <Loader />:
      <div className="w-[100%] m-auto mb-4 p-6">
        <h1 className="font-serif text-2xl text-blue-700 tracking-[6px] mb-8">Buy the car</h1>
        <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row gap-10 justify-center">
          <div className={`flex flex-col rounded-lg shadow-xl border ${isDarkMode ? "border-gray-700" : "bg-white"}`}>
            {carDetails?.img && carDetails?.img.length > 0 && (
              <div className="w-[100%] h-80 overflow-hidden">
              <img src={carDetails.img[0]} alt="" className="w-[100%] h-80 rounded-lg transform hover:scale-125 transition duration-500 ease-out" />
              </div>
            )}
            <div className="flex flex-col gap-4 p-4 font-thin text-xl">
              <p className="text-lg text-gray-500">
                <strong>Car Name :</strong> {carDetails.car}
              </p>
              <p className="text-gray-500 text-lg">
                <strong>Color :</strong> {carDetails.car_color}
              </p>
              <p className="text-gray-500 text-lg">
                <strong>Model Year :</strong> {carDetails.car_model_year}
              </p>
              <p className="text-gray-500 text-lg">
                <strong>Price :</strong> ${carDetails.price}
              </p>
            </div>
          </div>
          {/* تمرير doc.id إلى مكون Payment */}
          <Payment carId={id} />
        </div>
      </div>
}
    </>
  );
};

export default React.memo(BuyDetails); // استخدام React.memo للحفظ من التكرار الذاتي للعنصر BuyDetails;
