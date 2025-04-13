import { Rent } from "./data"
import { Link } from 'react-router-dom';
import React from "react";

const Four = () => {

    return (
        <>

        <div data-aos="fade-up">

        <h1 className='font-bold text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl my-10 p-2 text-blue-700 tracking-[2px]' >Our special car rental offers</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 place-items-center m-auto">
 {Rent.map((item) => (
            <div key={item.id}>
<div className="flex flex-col">
   <div className='flex pt-2'>
                    <img src={item.img} alt="image" className='w-[23rem] h-72 rounded-l-lg m-3 transition-all duration-500  hover:scale-105' loading="lazy"  />
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

        <div className="text-start flex justify-center mt-12">
        <button className="m-auto border-2 border-blue-800 text-xl text-blue-700 rounded-lg px-6 hover:bg-blue-800 hover:text-white">
          <Link to="/offers">Show All Cars</Link>
        </button>
      </div>

        </>
    )
}

export default React.memo(Four);