import yser from '../../../src/assets/img/yser.png'
import message from '../../../src/assets/img/message.png'
import chat from '../../../src/assets/img/chat.png'
import newImage from '../../../src/assets/img/new.mp4'
import React from 'react'
import { useTranslation } from 'react-i18next';


const Six = () => {

  const { t } = useTranslation();


 




    return (
       <>
       
<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 place-items-center m-auto mt-10' data-aos="fade-up">

<div className='flex flex-col'>
 <div className=' border-2 border-blue-700  w-max px-4 py-1 text-center text-blue-700 rounded-lg hover:bg-blue-700 hover:text-white m-auto mb-4 cursor-pointer'>{t('whyChooseUs')}</div>
  <h1 className='font-serif text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl mb-5 p-2'>{t('we offer best experience')}</h1>
  <div className='flex flex-col gap-3'>
  <div className='flex gap-2 mx-2'> <img src={yser} alt="user" loading='lazy'/> <div><h1 className='text-lg font-semibold text-start'>{t('best price guaranteed')}</h1>  <p className='font-serif text-gray-500 text-start'>{t('find lower price')}</p></div> </div>
  <div className='flex gap-2 mx-2'> <img src={message} alt="doors" loading='lazy'/> <div><h1 className='text-lg font-semibold text-start'>{t('24 hour car delivery')}</h1>  <p className='font-serif text-gray-500 text-start'>{t('book your car anytime')}</p></div>   </div>
  <div className='flex gap-2 mx-2'> <img src={chat} alt="frame" loading='lazy'/> <div><h1 className='text-lg font-semibold text-start'>{t('24 7 technical support')}</h1>  <p className='font-serif text-gray-500 text-start '>{t('have a question')}</p></div>  </div>
  </div>
  </div> 
  <div className='mt-4 sm:mt-4 md:mt-32 lg:mt-28 xl:mt-20'>
   <video src={newImage} autoPlay loop muted playsInline disablePictureInPicture className='rounded-full'  data-aos ="zoom-in" ></video>
</div>


</div>
       
       
       
       </>
    )
}        

export default React.memo(Six);