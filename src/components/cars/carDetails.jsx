import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "../load/Load";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import Payment from "./payment";

const Details = () => {
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState({});
  const [Details, setDetails] = useState(true);
  const toggleDetails = () => setDetails(!Details);
  const [mainImage, setMainImage] = useState(""); // للصورة الكبيرة
  const isLoggedIn = localStorage.getItem("token") !== null;
  const role = localStorage.getItem("role");
  const carId = id;
  const admin = 'hazemsaad231@gmail.com';
  const [loading, setLoading] = useState(true);
  localStorage.setItem("id", id);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCarDetails = async () => {
      const docRef = doc(db, "cars", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCarDetails(data);
        setMainImage(data.img[0]); // الصورة الافتراضية الكبيرة
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    };
    fetchCarDetails();
  }, [id]);

  // const settings = {
  //   dots: true,
  //   dotsClass: "slick-dots slick-thumb",
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: false
  // };

  return (
    <>
      <ToastContainer limit={1} />
      {loading ? <Loader /> : (
        <div className="p-4 py-12 md:py-20 md:p-20">
          <div className="grid md:grid-cols-2 gap-4">

            {/* Slider + thumbnails */}
            <div>
              <img
                src={mainImage}
                alt="Main Car"
                className="h-96 w-full object-center rounded-xl shadow-lg mb-4"
              />
              <div className="flex overflow-x-auto">
                {Array.isArray(carDetails.img) && carDetails.img.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className={`h-20 w-28 object-cover rounded-lg m-auto cursor-pointer border-2 ${mainImage === img ? 'border-blue-600' : 'border-transparent'}`}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            </div>

            {/* Car details */}
            <div className="bg-white p-6 rounded-xl shadow-xl">
              {Details ? (
                <>
                  <h1 className="text-xl md:text-2xl lg:text-[1.7rem] font-bold text-gray-800 mb-4">
                    {t('Elevate Your Ride with Our Premium Cars')}
                  </h1>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 text-gray-700 md:text-lg">
                    <p><strong>{t('Car Name')}:</strong> {t(carDetails.car)}</p>
                    <p><strong>{t('Car Type')}:</strong> {t(carDetails.carType)}</p>
                    <p><strong>{t('Car Color')}:</strong> {t(carDetails.car_color)}</p>
                    <p><strong>{t('Car Model')}:</strong> {t(carDetails.car_model_year)}</p>
                    <p><strong>{t('Car Price')}:</strong> ${t(carDetails.price)}</p>
                    <p><strong>{t('Mileage')}:</strong> {t(carDetails.mileage)}</p>
                    <p><strong>{t('Transmission')}:</strong> {t(carDetails.Transmission)}</p>
                    <p><strong>{t('Horsepower')}:</strong> {t(carDetails.Horsepower)}</p>
                  </div>

                  {/* Buy button */}
                  {role !== admin && (
                    <div className="text-center mt-8">
                      <button
                        className="bg-blue-600 text-white px-16 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
                        onClick={() => {
                          if (!isLoggedIn) {
                            toast.warn(t('You must sign in first!'), {
                              position: "top-right",
                              autoClose: 3000,
                              theme: "dark",
                            });
                          } else {
                            toggleDetails();
                          }
                        }}
                      >
                        {t('Buy')}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Payment carDetails={carDetails} carId={carId} />
              ) 
              }
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
