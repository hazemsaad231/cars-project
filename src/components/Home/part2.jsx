import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { db, collection, getDocs } from "../firebase/firebase";
import { Context } from "../context/Context";
import airIcon from "../../../src/assets/img/air.png";
import frameIcon from "../../../src/assets/img/Frame.png";
import starIcon from "../../../src/assets/img/star.png";

const Two = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useContext(Context);

  useEffect(() => {
    const fetchCars = async () => {
      const querySnapshot = await getDocs(collection(db, "cars"));
      const carsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCars(carsList.slice(0, 4));
      setLoading(false);
    };
    fetchCars();
  }, []);

  return (
    <div className="w-[80%] m-auto mt-20">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Most Popular Cars</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`flex flex-col rounded-lg shadow-xl p-4 ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-200"
                } animate-pulse`}
              >
                <div className="h-48 bg-gray-400 rounded mb-4"></div>
                <div className="h-6 bg-gray-400 rounded mb-2"></div>
                <div className="h-4 bg-gray-400 rounded mb-2"></div>
                <div className="h-4 bg-gray-400 rounded mb-2"></div>
                <div className="h-6 bg-gray-400 rounded"></div>
              </div>
            ))
          : cars.map((car) => (
              <div
                key={car.id}
                className={`flex flex-col rounded-lg shadow-xl p-4 ${
                  isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
              >
                <img
                  src={car.img[0]}
                  alt="Car"
                  className="h-48 w-full object-cover rounded mb-4"
                />
                <h2 className="text-xl font-bold mb-2">{car.car}</h2>
                <div className="flex items-center mb-2">
                  <img src={starIcon} alt="" className="w-5 h-5 mr-2" />
                  <span>{car.evaluation}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <FaUserAlt className="mr-1" /> 4 Passengers
                  </div>
                  <div className="flex items-center">
                    <img src={airIcon} alt="" className="w-5 h-5 mr-1" /> AC
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>{car.carType}</span>
                  <div className="flex items-center">
                    <img src={frameIcon} alt="" className="w-5 h-5 mr-1" />
                    {car.car_model_year}
                  </div>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between">
                  <span>Price</span>
                  <span className="font-bold">{car.price}</span>
                </div>
              </div>
            ))}
      </div>

      <div className="flex justify-center mt-10">
        <button className="border-2 border-blue-800 px-6 py-2 text-blue-700 hover:bg-blue-800 hover:text-white rounded-lg">
          <Link to="/allcars">Show All Cars</Link>
        </button>
      </div>
    </div>
  );
};

export default Two;
