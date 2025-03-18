import { useEffect, useState } from "react";
import React from "react";
import Aos from "aos";
import 'aos/dist/aos.css';
const Offer = () => {



    useEffect(() => {
        Aos.init({
          duration: 500,  // مدة التأثير
          once: true,  // التأثير يتم مرة واحدة فقط عند التمرير
        });
      }, []);




    const targetDate = new Date("2025-12-30T23:59:59").getTime();

    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            // حساب الأيام، الساعات، الدقائق، والثواني
            const days = Math.floor(distance / (6000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // تحديث الحالة
            setTimeLeft({ days, hours, minutes, seconds });

            // إذا انتهى العداد، أوقف التحديث
            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => clearInterval(interval); // تنظيف عند فك التعلق
    }, [targetDate]);



    return (
    <div style={{ fontFamily: "arial" }}>  <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-around items-center p-10 rounded-xl m-10">
    <div className="flex flex-col justify-center items-center" data-aos="zoom-in">
        <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-blue-700">All cars are 20% off now!
            <div>Don't miss this offer</div>
        </h1>
        <div>
        </div>
        <p className="text-gray-500 w-full p-2 sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 m-2">This offer applies to most cars offered for rent.</p>

            <table >
                <thead className="text-gray-400">
                <th className="p-2">Days</th>
                <th className="p-2">Hours</th>
                <th className="p-2">Minutes</th>
                <th className="p-2">Seconds</th>
                </thead>
                
                <tr className="text-center text-blue-700 text-2xl font-semibold">
                    <td>{timeLeft.days}</td>
                    <td>{timeLeft.hours}</td>
                    <td>{timeLeft.minutes}</td>
                    <td>{timeLeft.seconds}</td>
                </tr>
            </table>
       
    </div>
</div>

</div>
    )

}


export default React.memo(Offer); // استخدام React.memo للحفظ من التكرار الذاتي للعنصر Offer
