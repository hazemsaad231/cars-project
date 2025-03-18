import Names from "./data";
import star from "../../../src/assets/img/star.png";
import { useEffect, useContext } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import { Context } from "../context/Context";

const Seven = () => {
  // تشغيل تأثيرات AOS عند تحميل المكون لمرة واحدة فقط
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  // الحصول على وضع الثيم (فاتح أو داكن) من الـ Context
  const { isDarkMode } = useContext(Context);

  {/* التنسيقات للسلايدر */}
  const settings = {
    dots: true, 
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true, 
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } }, 
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <>
      <h1
        className="font-semibold text-4xl mt-24 mb-10 p-2"
        style={{ fontFamily: "arial" }}
      >
        <span className="text-blue-700">Tweets</span> of some users
      </h1>

      {/* الحاوبه مع تأثير AOS */}
      <div className="my-4 w-full" data-aos="zoom-in">
        <Slider {...settings}>
          {Names.map((item) => (
            <div key={item.id}>
              {/* عنصر التغريدة الفردي */}
              <div
                className={`flex flex-col xl:flex-row gap-2 rounded-xl shadow-lg m-10 ${
                  isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
              >
                {/* الصورة */}
                <div className="h-80 overflow-hidden rounded-l-lg">
                  <img
                    src={item.image}
                    alt={`Profile of ${item.name}`} // تحسين الـ alt ليكون أكثر دقة
                    className="w-96 h-80 object-cover m-auto"
                    loading="lazy"
                  />
                </div>

                {/* تفاصيل التغريدة */}
                <div className="flex flex-col pt-2 text-center">
                  <h1>{item.num} stars</h1>

                  {/* عرض النجوم بناءً على التقييم */}
                  <div className="flex justify-center">
                    {Array.from({ length: item.star.length }).map((_, index) => (
                      <img
                        key={index}
                        src={star}
                        alt="Star"
                        className="w-5 mr-1"
                      />
                    ))}
                  </div>

                  {/* نص التغريدة */}
                  <p className="font-serif w-48 h-48 p-2 mx-auto">
                    {item.discription}
                  </p>

                  {/* معلومات المستخدم */}
                  <h3 className="px-2">{item.name}</h3>
                  <p className="text-gray-500 text-sm px-2 pb-2">{item.date}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Seven;
