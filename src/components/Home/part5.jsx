// import { Brands } from "./data";
// import LazyLoad from 'react-lazy-load';

// const Brand = () => {


//     return (

//         <div data-aos="fade-up" className="my-20">

//             <h1 className='font-bold text-2xl mb-16 mt-8 text-blue-700 tracking-[5px]'style={{ fontFamily: "arial" }}>Popular Brands</h1>
//             <div  className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 place-items-center gap-12 w-[90%] m-auto cursor-pointer">
//             {Brands.map(({ item, icon: Icon }) => (
//   <LazyLoad key={item} height={120} offset={100}>
//     <div className="border border-gray-300 rounded-lg p-4 bg-transparent" id="btn">
//       <Icon size={100} className="text-blue-700 m-auto" />
//     </div>
//   </LazyLoad>
// ))}
//             </div>


//         </div>
//     )
// }

// export default Brand;

import { lazy, Suspense, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import LazyLoad from "react-lazy-load";
import { Brands } from "./data";
import Aos from "aos";

const Brand = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      Aos.init({ duration: 1000 });
    }
  }, [inView]);

  return (
    <div ref={ref} className="my-20">
      <h1 className="font-bold text-2xl mb-16 mt-8 text-blue-700 tracking-[5px]" style={{ fontFamily: "arial" }}>
        Popular Brands
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 place-items-center gap-12 w-[90%] m-auto cursor-pointer">
        {Brands.map(({ item, icon }) => {
          const LazyIcon = lazy(icon);
          return (
            <Suspense key={item} fallback={<div>Loading...</div>}>
              <LazyLoad height={120} offset={100}>
                <div className="border border-gray-300 rounded-lg p-4 bg-transparent" id="btn">
                  <LazyIcon size={100} className="text-blue-700 m-auto" />
                </div>
              </LazyLoad>
            </Suspense>
          );
        })}
      </div>
    </div>
  );
};

export default Brand;

