import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { db, collection, addDoc } from "../firebase/firebase";
import {useParams } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { Context}  from "../context/Context";
import Aos from "aos";
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';

const AddRent = () => {
  
  const { id } = useParams();
  const { register, handleSubmit,setValue, formState: { errors } } = useForm();
 const navigate = useNavigate()

 const{isDarkMode} = useContext(Context);
 const { t } = useTranslation();
 
  useEffect(() => {
    const fetchCarData = async () => {
      if (id) {
        try {
          const docRef = doc(db, "Rent", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const carData = docSnap.data();

            // تحويل المصفوفة إلى نص مفصول بفواصل
            if (Array.isArray(carData.img)) {
              carData.img = carData.img.join(", ");
            }

            Object.keys(carData).forEach((key) => {
              setValue(key, carData[key]);
            });
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching car data: ", error);
        }
      }
    };

    fetchCarData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {


    
      if (id) {
        const docRef = doc(db, "Rent", id);
        await updateDoc(docRef, data);
      
          navigate("/offers",{state:{message:t("Car data updated successfully!")}});
      
      
      
      } else {
        await addDoc(collection(db, "Rent"), data);
        console.log("Car data added successfully!");
      
          navigate("/offers",{state:{message:t("Car data added successfully!")}});
      
    
      }
    } catch (error) {
      console.error("Error saving car data: ", error);
    }
  };

 useEffect(() => {
      Aos.init({
        duration: 1000,  // مدة التأثير
        once: true,  // التأثير يتم مرة واحدة فقط عند التمرير
      });
    }, []);


  return (
    <>
      <div data-aos="zoom-in" className="text-start">
      <div className={`shadow-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-5  w-[90%] sm:w-[90%] md:w-max lg:w-max m-auto mt-10 `} >
        <h2 className="text-xl text-center font-serif tracking-[4px]">
          {id ? t("Update Car") : t("Add a New Car")}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-max p-10 m-auto font-serif text-gray-500">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            <div className="flex flex-col">
              <label className="text-start">{t('Car Name')}</label>
              <input
                type="text"
                className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
                {...register("title", { required: t("Car name is required") })}
              />
              {errors.title && <p className="text-red-400 text-sm">{errors.title.message}</p>}
            </div>

            {/* باقي الحقول */}
            <div className="flex flex-col">
              <label className="text-start">{t('Images')}</label>
              <input
                type="text"
                className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
                {...register("img", { required: t("At least one image URL is required")})}
              />
              {errors.img && <p className="text-red-400 text-sm">{errors.img.message}</p>}
            </div>

            {/* الحقول الأخرى كما هي */}
            <div className="flex flex-col">
              <label className="text-start">{t('Price')}</label>
              <input
                type="text"
                className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
                {...register("price", { required: "Price is required" })}
              />
              {errors.price && <p className="text-red-400 text-sm">{errors.price.message}</p>}
            </div>

            <div className="flex flex-col">
              <label className="text-start">{t('New Price')}</label>
              <input
                type="text"
                className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
                {...register("new_price", { required: "New price is required" })}
              />
              {errors.new_price && <p className="text-red-400 text-sm">{errors.new_price.message}</p>}
            </div>


            <div className = 'flex flex-col'>
           <label className = 'text-start'>{t('Description')}</label>
           <input
            type="text"
            className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
            {...register("text", { required: "Description is required" })}
          />
          {errors.text && <p className = "text-red-400 text-sm">{errors.text.message}</p>}
        </div>

          </div>
          <div className="flex justify-center">
          <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg mt-4">
            {id ? t("Update Car") : t("Add Car")}
          </button>
          </div>
        </form>
      </div></div>
    </>
  );
};

export default AddRent;