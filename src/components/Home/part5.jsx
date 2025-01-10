import Names from './data'
import star from '../../../src/assets/img/star.png'
import { useEffect } from 'react';
import Aos from "aos";
import 'aos/dist/aos.css';
import Slider from "react-slick";
import { useContext} from 'react';
import { Context } from '../context/Context';

const Five = () => {



    useEffect(() => {
        Aos.init({
          duration: 1000,  // مدة التأثير
          once: true,  // التأثير يتم مرة واحدة فقط عند التمرير
        });
      }, []);

     const { isDarkMode} = useContext(Context)

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
          { breakpoint: 480, settings: { slidesToShow: 1 } }
        ]
      }



    return (

        <>

<h1 className='font-semibold text-4xl mt-24 mb-10' style={{ fontFamily: "arial" }}> <span className='text-blue-700'>Tweets</span> of some users</h1>
        <div className='my-4 w-full' data-aos="zoom-in">
        <Slider {...settings}>
{Names.map((item) => (
    <div key={item.id}>


<div className={`flex flex-col sm:flex-col md:flex-col lg:flex-col xl:flex-row gap-2 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} m-10`}>
<div className='h-80'>
    <img src={item.image} alt="image" className='w-96 h-80 object-cover m-auto  rounded-l-lg'  />
</div>


<div className='flex flex-col pt-2'><h1>{item.num} stars</h1>
        <div className='flex justify-center'>
                {item.star.map((_, index) => (
                        <img 
                            key={index} 
                            src={star} 
                            alt="Star" 
                            style={{ width: '20px', marginRight: '5px' }} 
                            
                        />
                    ))}
        </div>
        <p  className='font-serif w-48 h-48 p-2 text-center m-auto '>{item.discription}</p>

        <br />

        <h3 className='text-center px-2'>{item.name}</h3>
        <p className='text-gray-500 text-sm text-center px-2 pb-2'>{item.date}</p>
        </div>
       
        </div>
     
       
    </div>
)   )}

</Slider>
</div>
        
        
        </>
    )
};

export default Five
