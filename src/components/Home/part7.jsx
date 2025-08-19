import Names from "./data";
import star from "../../../src/assets/img/star.png";
import { useContext, useMemo } from "react";
import Slider from "react-slick";
import { Context } from "../context/Context";
import React from "react";
import { useTranslation } from 'react-i18next';

const Seven = () => {
  const { isDarkMode } = useContext(Context);
  const { t } = useTranslation();

  // تحسين السلايدر لأداء أفضل
  const settings = useMemo(() => ({
    dots: true,
    infinite: false, // تقليل الحمل على الأداء
    speed: 300,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 6000, // تقليل عدد مرات التشغيل
    pauseOnHover: true,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  }), []);

  return (
    <>
      <h1 className="font-semibold text-3xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl mt-16 mb-4 p-2">
        <span className="text-blue-700">{t('Tweets')}</span> {t('of some users')}
      </h1>

      <div className="my-4 w-full" data-aos="fade-up">
        <Slider {...settings}>
          {Names.map((item) => {
            const stars = useMemo(
              () =>
                Array.from({ length: item.star.length }).map((_, index) => (
                  <img
                    key={index}
                    src={star}
                    alt="Star"
                    className="w-5 mr-1"
                    loading="lazy"
                  />
                )),
              [item.star.length]
            );

            return (
              <div key={item.id}>
                <div
                  className={`flex flex-col xl:flex-row gap-2 rounded-xl shadow-lg m-8 ${
                    isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
                  }`}
                >
                  <div className="h-80 overflow-hidden rounded-l-lg">
                    <img
                      src={item.image}
                      alt={`Profile of ${item.name}`}
                      className="w-96 h-80 object-center m-auto"
                      loading="lazy"
                      width="384"
                      height="320"
                    />
                  </div>

                  <div className="flex flex-col pt-2 text-center">
                    <h1>{item.num} {t('stars')}</h1>
                    <div className="flex justify-center">{stars}</div>
                    <p className="font-serif w-48 h-48 p-2 mx-auto whitespace-pre-line text-base dark:text-gray-200">
                      {t(`tweet_full_${item.id}`).split('\n')[0]}
                    </p>
                    <h3 className="px-2 font-bold text-blue-700 text-lg mt-2">
                      {t(`tweet_full_${item.id}`).split('\n')[1]}
                    </h3>
                    <p className="text-sm px-2 pb-2 mt-1">
                      {t(`tweet_full_${item.id}`).split('\n')[2]}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default React.memo(Seven);
