import { Rent } from "./data"
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Aos from "aos";
import 'aos/dist/aos.css';
const Three = () => {


    useEffect(() => {
        Aos.init({
          duration: 1000,  // مدة التأثير
          once: true,  // التأثير يتم مرة واحدة فقط عند التمرير
        });
      }, []);

      const role = localStorage.getItem("role");



    return (
        <>
        <div style={{ fontFamily: "arial" }}>
        <h1 className='font-bold text-2xl mt-16 mb-16 p-2 text-blue-700 tracking-[2px]' >Our special car rental offers</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 place-items-center m-auto">
 {Rent.map((item) => (
            <div key={item.id} data-aos="zoom-in" >
<div className="flex flex-col">
   <div className='flex pt-2'>
                    <img src={item.img} alt="image" className='w-96 h-72 rounded-l-lg m-3  hover:scale-110'  />
                </div>    
                <div className='flex flex-col pt-2'>
                    <h1 className="font-bold text-xl text-blue-700">{item.title}</h1>
                    <p className='font-serif text-sm w-60 h-36 p-2 text-center m-auto '>{item.text}</p>
                    <div className='flex gap-4 justify-center'>
                        <h1 className='font-semibold line-through'>${item.price}</h1>
                        <h1 className='font-semibold text-blue-700'>${item.newPrice}</h1>

                    </div>
                </div>
</div>
             
            </div>
        ))}

        </div>
   
        </div>

        <div className='text-start flex justify-center mt-10'> 
    <button className='m-auto border-2 border-blue-600 text-xl text-blue-600 rounded-lg px-12 py-1 hover:bg-blue-600 hover:text-white'><Link to={'/offers'}> Show All Cars</Link></button>
  </div>


        </>
    )
}

export default Three