import React, { useContext, useEffect, useCallback } from "react";
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

const AddCar = () => {

  const { id } = useParams();
  const { register, handleSubmit,setValue, formState: { errors } } = useForm();
 const navigate = useNavigate()
 const{isDarkMode} = useContext(Context);
 const { t } = useTranslation();


 const fetchCarData = useCallback(async () => {
  if (id) {
    try {
      const docRef = doc(db, "cars", id);
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
}, [id, setValue]);


  useEffect(() => {
    fetchCarData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {

      const imagesArray = data.img.split(",").map((url) => url.trim());

      
      const formattedData = { ...data, img: imagesArray };

      if (id) {
        const docRef = doc(db, "cars", id);
        await updateDoc(docRef, formattedData);
          navigate("/allcars",{state:{message:"Car data updated successfully!"}});
      
      } else {
        await addDoc(collection(db, "cars"), formattedData);
        console.log("Car data added successfully!");
          navigate("/allcars",{state:{message:"Car data added successfully!"}});
      
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
          {id ? t('Update Car') : t('Add a New Car')}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-max p-10 m-auto font-serif text-gray-500">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            <div className="flex flex-col">
              <label className="text-start">{t('Car Name')}</label>
              <input
                type="text"
                className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
                {...register("car", { required: t("Car name is required") })}
              />
              {errors.car && <p className="text-red-400 text-sm">{errors.car.message}</p>}
            </div>

            {/* باقي الحقول */}
            <div className="flex flex-col">
              <label className="text-start">{t('Images')}</label>
              <input
                type="text"
                className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
                {...register("img", { required: t("At least one image URL is required"), validate: (value) => value.includes(",") || t("Separate URLs with commas") })}
              />
              {errors.img && <p className="text-red-400 text-sm">{errors.img.message}</p>}
            </div>

            {/* الحقول الأخرى كما هي */}
            <div className="flex flex-col">
              <label className="text-start">{t('Car Type')}</label>
              <input
                type="text"
                className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
                {...register("carType", { required: t("Car type is required") })}
              />
              {errors.carType && <p className="text-red-400 text-sm">{errors.carType.message}</p>}
            </div>

            <div className="flex flex-col">
              <label className="text-start">{t('Car Color')}</label>
              <input
                type="text"
                className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
                {...register("car_color", { required: t("Car color is required") })}
              />
              {errors.car_color && <p className="text-red-400 text-sm">{errors.car_color.message}</p>}
            </div>


            <div className = 'flex flex-col'>
           <label className = 'text-start'>{t('Car Model Year')}</label>
           <input
            type="text"
            className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
            {...register("car_model_year", { required: t("Model year is required") })}
          />
          {errors.car_model_year && <p className = "text-red-400 text-sm">{errors.car_model_year.message}</p>}
        </div>


        <div className = 'flex flex-col'>
          <label className = 'text-start'>{t('Price')}</label>
          <input
            type="text"
            className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
            {...register("price", { required: t("Price is required") })}
          />
          {errors.price && <p className = "text-red-400 text-sm">{errors.price.message}</p>}
        
        </div>



            <div className = 'flex flex-col'>
          <label className = 'text-start'>{t('Mileage')}</label>
          <input
            type="text"
            className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
            {...register("mileage", { required: t("Mileage is required") })}
          />
          {errors.mileage && <p className = "text-red-400 text-sm">{errors.mileage.message}</p>}
        </div>

        <div className = 'flex flex-col'>
          <label className = 'text-start'>{t('Transmission')}</label>
          <input
            type="text"
            className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
            {...register("Transmission", { required: t("Transmission is required") })}
          />
          {errors.Transmission && <p className = "text-red-400 text-sm">{errors.Transmission.message}</p>}
        </div>

        <div className = 'flex flex-col'>
          <label className = 'text-start'>{t('Horsepower')}</label>
          <input
            type="text"
            className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
            {...register("Horsepower", { required: t("Horsepower is required") })}
          />
          {errors.Horsepower && <p className = "text-red-400 text-sm">{errors.Horsepower.message}</p>}
        </div>

        <div className = 'flex flex-col'>
          <label className = 'text-start'>{t('IsBooked')}</label>
          <input
            type="text"
            className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
            {...register("isBooked", { required: t("IsBooked is required") })}
          />
          {errors.isBooked && <p className = "text-red-400 text-sm">{errors.isBooked.message}</p>}
        </div>


        <div className = 'flex flex-col'>
          <label className = 'text-start'>{t('evaluation')}</label>
          <input
            type="text"
            className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
            {...register("evaluation", { required: t("evaluation is required") })}
          />
          {errors.evaluation && <p className = "text-red-400 text-sm">{errors.evaluation.message}</p>}
        </div>


        <div className = 'flex flex-col'>
          <label className = 'text-start'>{t('reviews')}</label>
          <input
            type="text"
            className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
            {...register("reviews", { required: t("reviews is required") })}
          />
          {errors.reviews && <p className = "text-red-400 text-sm">{errors.reviews.message}</p>}
        </div>

        <div className = 'flex flex-col'>
          <label className = 'text-start'>{t('favourite')}</label>
          <input
            type="text"
            className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
            {...register("favourite")}
          />
        </div>


          </div>
          <div className="flex justify-center">
          <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg mt-4">
            {id ? t('Update Car') : t('Add Car')}
          </button>
          </div>
         
        </form>
      </div></div>
    </>
  );
};

export default AddCar;
