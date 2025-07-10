import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Loader from "../load/Load";
import { toast, ToastContainer } from 'react-toastify';


const Details = () => {

  const { id } = useParams();
  const [carDetails, setCarDetails] = useState({});

  const isLoggedIn = localStorage.getItem("token") !== null;

  {/* تخزين البيانات في localStorage */}
  localStorage.setItem("id", id);
  localStorage.setItem("isBooked", carDetails.isBooked);

  const role = localStorage.getItem("role");


  const [loading, setLoading] = useState(true);
  
  {/* جلب بيانات السيارة من قاعدة البيانات */}
  useEffect(() => {
    const fetchCarDetails = async () => {
      const docRef = doc(db, "cars", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCarDetails(docSnap.data());
        setLoading(false);
      } else {
        console.log("No such document!");
      }
    };

    fetchCarDetails();      

  }, [id]);


{/* تعيين اعدادات السلايدر */}
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false
  };

  return (



    
<div className="py-16 sm:py-16 md:py-20 lg:py-32 xl:py-40">
  <ToastContainer limit={1} />

{ loading ? <Loader/>:
      <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row gap-2 p-2 sm:p-2 md:p-6 lg:p-8 xl:p-12">


        <div className=" w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 bg-white shadow-2xl rounded-l-xl p-2" data-aos="fade-right">

           <h1 className="text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl font-extrabold text-gray-800 mt-8 mb-8 leading-tight">
              Elevate Your Ride with Our Premium Cars
            </h1>

          <div className="grid grid-cols-2 gap-y-4 m-auto">
            <p className="text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg text-gray-600">
            <strong>car:</strong>   {carDetails.car}
            </p>
           
              <p className="text-gray-600 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg">
                <strong>fuel Type:</strong> {carDetails.carType}
                </p>

            <p className="text-gray-600 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg">
              <strong>Color:</strong> {carDetails.car_color}
            </p>
            <p className="text-gray-600 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg">
              <strong>Model Year:</strong> {carDetails.car_model_year}
            </p>
            <p className="text-gray-600 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg">
              <strong>Price:</strong> ${carDetails.price}
            </p>
            
            <p className="text-gray-600 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg">
              <strong>Mileage:</strong> {carDetails.mileage}
            </p>

            <p className="text-gray-600 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg">
              <strong>Transmission :</strong> {carDetails.Transmission}
            </p>

            <p className="text-gray-600 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg mb-6">
              <strong>Horsepower:</strong> {carDetails.Horsepower}
            </p>
           
          </div>
      
         
          
          <div className="text-center hidden sm:hidden md:block lg:block xl:block">
          { role !== 'hazemsaad231@gmail.com' ? 
           <button className="bg-blue-600 text-white px-12 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-all mx-2"
           onClick={() => {
            if (!isLoggedIn) {
              toast.warn('You must sign in first!', {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
              });
            }
          }}
           >
           
           {isLoggedIn? <Link to={`/buy/${id}`}>buying</Link>: 'buying'}
         </button> :null
        }
          </div>

        </div>

        <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 text-center" data-aos="fade-left">

<Slider {...settings}>
  {Array.isArray(carDetails.img) &&
    carDetails.img.map((image, index) => (
      <img
        key={index}
        src={image}
        alt="Car"
        className="h-[30vh] sm:h-[30vh] md:h-[35vh] lg:h-[60vh] xl:h-[50vh] rounded-r-xl transform hover:scale-110 transition duration-500"
      />
    ))}
</Slider>

</div>

<div className="mt-8 mb-2 text-center block sm:block md:hidden lg:hidden xl:hidden">
        { role !== 'hazemsaad231@gmail.com' ? 
           <button className="bg-blue-600 text-white px-12 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-all mx-2"
           onClick={() => {
            if (!isLoggedIn) {
              toast.warn('You must sign in first!', {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
              });
            }
          }}
           >
           
           {isLoggedIn? <Link to={`/buy/${id}`}>buying</Link>: 'buying'}
         </button> :null
        }
          </div>

        </div>
 

  
}

      </div>

  );
};

export default Details;
