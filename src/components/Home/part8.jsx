import { SiToyota } from "react-icons/si";
import { SiFord } from "react-icons/si";
import { SiJeep } from "react-icons/si";
import { SiHyundai } from "react-icons/si";
import { SiKia } from "react-icons/si";
import { SiMercedes } from "react-icons/si";
import { SiBmw } from "react-icons/si";
import { SiMaserati } from "react-icons/si";
import Aos from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react";

const Brand = () => {


   useEffect(() => {
      Aos.init({
        duration: 1000,  // مدة التأثير
        once: true,  // التأثير يتم مرة واحدة فقط عند التمرير
      });
    }, []);



    return (

        <div className="py-20" data-aos="zoom-in">
            <h1 className='font-bold text-2xl mb-16 mt-8 text-blue-700 tracking-[5px]'style={{ fontFamily: "arial" }}>Popular Brands</h1>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 place-items-center gap-12 w-[90%] m-auto cursor-pointer">

                <div className="border border-gray-300 rounded-lg p-4 bg-transparent" id="btn"> <SiJeep size={100} className=' text-blue-700 m-auto' /></div>
                <div className="border border-gray-300 rounded-lg p-4 bg-transparent" id="btn"> <SiFord size={100} className=' text-blue-700 m-auto' /></div>
                <div className="border border-gray-300 rounded-lg p-4 bg-transparent" id="btn"> <SiHyundai size={100} className=' text-blue-700 m-auto'/></div>
                <div className="border border-gray-300 rounded-lg p-4 bg-transparent" id="btn"> <SiKia size={100} className=' text-blue-700 m-auto'/></div>
                <div className="border border-gray-300 rounded-lg p-4 bg-transparent" id="btn"> <SiMercedes size={100} className=' text-blue-700 m-auto'/></div>
                <div className="border border-gray-300 rounded-lg p-4 bg-transparent" id="btn"> <SiBmw size={100} className=' text-blue-700 m-auto'/></div>
                <div className="border border-gray-300 rounded-lg p-4 bg-transparent" id="btn"> <SiMaserati size={100} className=' text-blue-700 m-auto'/></div>
                <div className="border border-gray-300 rounded-lg p-4 bg-transparent" id="btn"> <SiToyota size={100} className=' text-blue-700 m-auto'/></div>


               
            
            </div>
        </div>
    )
}

export default Brand