import { useEffect, useState } from "react";
import React from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const Offer = () => {
  useEffect(() => {
    if (!Aos.initialized) {
      Aos.init({
        duration: 500, // مدة التأثير
        once: true, // التأثير يتم مرة واحدة فقط عند التمرير
      });
      Aos.initialized = true;
    }
  }, []);

  const targetDate = new Date("2025-12-30T23:59:59").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div style={{ fontFamily: "arial" }}>
      <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-around items-center p-10 rounded-xl m-10">
        <div className="flex flex-col justify-center items-center" data-aos="zoom-in">
          <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-blue-700">
            All cars are 20% off now!
            <p>Do not miss this offer</p>
          </h1>
          <p className="text-gray-500 w-full p-2 sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 m-2">
            This offer applies to most cars offered for rent.
          </p>

          {/* تحسين إمكانية الوصول بإضافة aria-live */}
          <div aria-live="polite">
            <table className="border-collapse border border-gray-300 mt-4">
              <thead className="text-gray-400">
                <tr>
                  <th className="p-2 border border-gray-300">Days</th>
                  <th className="p-2 border border-gray-300">Hours</th>
                  <th className="p-2 border border-gray-300">Minutes</th>
                  <th className="p-2 border border-gray-300">Seconds</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center text-blue-700 text-2xl font-semibold">
                  <td className="border border-gray-300 p-2">{timeLeft.days}</td>
                  <td className="border border-gray-300 p-2">{timeLeft.hours}</td>
                  <td className="border border-gray-300 p-2">{timeLeft.minutes}</td>
                  <td className="border border-gray-300 p-2">{timeLeft.seconds}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Offer);
