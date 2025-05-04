import { useEffect, useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { db, collection, getDocs } from "../firebase/firebase";
import { Context } from "../context/Context";
// الصور
import airIcon from "../../../src/assets/img/air.png";
import frameIcon from "../../../src/assets/img/Frame.png";
import starIcon from "../../../src/assets/img/star.png";
import React from "react";



const Two = () => {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkMode } = useContext(Context);

  // جلب بيانات السيارات من قاعدة البيانات
  useEffect(() => {
    const fetchCars = async () => {
      const querySnapshot = await getDocs(collection(db, "cars"));
      const carsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filteredCars = carsList.filter((car) => car.favourite === "yes").slice(0, 4);
      setCars(filteredCars);

      localStorage.setItem("cars", JSON.stringify(carsList));
    };

    fetchCars();
  }, []);

  // دالة البحث باستخدام useCallback لمنع إعادة الحساب غير الضرورية
  const filteredCars = useCallback(() => {
    return cars.filter((car) => car.car.toUpperCase().includes(searchQuery.toUpperCase()));
  }, [cars, searchQuery]);

  return (
    <div>
      <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl font-bold mt-20 text-blue-700 tracking-[4px]">
        Most Popular Cars
      </h2>

      {/* مربع البحث */}
      <div className="mt-4 text-gray-500">
        <input
          type="text"
          placeholder="Search"
          className="w-[65%] p-1 mt-4 shadow-2xl border-2 border-gray-500 rounded-l-lg outline-blue-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="bg-blue-800 text-white p-1.5 rounded-r-lg w-[16vw]">Search</button>
      </div>

      {/* عرض السيارات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-[80%] m-auto mt-5 gap-4 place-items-center" data-aos="fade-up">
        {filteredCars().map((car) => (
          <div
            key={car.id}
            className={`flex flex-col text-center font-sans ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"} mb-4 shadow-xl gap-2 justify-center rounded-t-xl`}
          >
            <img src={car.img[0]} alt="Car" className="w-full h-60 m-auto mb-5 rounded-t-xl shadow-xl" loading="lazy"/>
            <h2 className="text-start font-medium text-2xl mt-2 ml-6 mb-2 h-16">{car.car}</h2>

            {/* تقييم السيارة */}
            <div className="flex gap-0.5 px-3">
              <img src={starIcon} alt="Star" className="w-5 h-5" loading="lazy" />
              <span className="font-bold">{car.evaluation}</span>
              <span className="font-thin"> ({car.reviews} reviews)</span>
            </div>

            {/* معلومات إضافية */}
            <div className="flex justify-between px-3">
              <div className="flex px-1 gap-1">
                <FaUserAlt className="text-xl" />
                <span className="text-sm">4 Passengers</span>
              </div>

              <div className="flex gap-1">
                <img src={airIcon} alt="Air Conditioning" className="w-5 h-6" loading="lazy" />
                <span className="text-sm">Air Conditioning</span>
              </div>
            </div>

            <div className="flex font-serif justify-between px-3">
              <span className=" text-lg">{car.carType}</span>
              <div className="flex ml-28">
                <img src={frameIcon} alt="Car Year" className="w-5 h-5" loading="lazy"/>
                <span className="text text-sm">{car.car_model_year}</span>
              </div>
            </div>

            <hr className="h-[2px] w-full m-auto" />

            {/* السعر */}
            <div className="flex justify-between px-3 mt-4">
              <h5 className="font-serif">Price</h5>
              <h5 className="font-bold">{car.price}</h5>
            </div>

            <br />
          </div>
        ))}
      </div>

      {/* زر عرض جميع السيارات */}
      <div className="text-start flex justify-center mt-16">
        <button className="m-auto border-2 border-blue-800 text-xl text-blue-700 rounded-lg px-6 hover:bg-blue-800 hover:text-white">
          <Link to="/allcars">Show All Cars</Link>
        </button>
      </div>
    </div>
  );
};

export default React.memo(Two); 
