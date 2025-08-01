import ios from '../../../src/assets/img/ios.png'
import iphone from '../../../src/assets/img/iPhone.png'
import andriod from '../../../src/assets/img/andriod.png'
import React from 'react'
import { useTranslation } from 'react-i18next';

const Eight = () => {
    const { t } = useTranslation();
    return (
   <>
   
   <div className='mt-16 ml-16 text-start' data-aos="fade-up">

        <h1 className='font-semibold text-3xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl mb-2'> {t('Download Rentcars App for FREE')} </h1>
        <p className='text-gray-500 text-sm'>{t('For faster, easier booking and exclusive deals.')}</p>
        <div>
            <img src={iphone}
             alt="iphone" 
             className='absolute right-[5%] w-[20%] h-80 hidden sm:hidden md:hidden lg:block xl:block'
             loading='lazy' />
        </div>


        <div className='flex gap-5 mt-5' id='contact' data-aos="zoom-in">
            <img src={ios} alt="ios" loading='lazy'/>
            <img src={andriod} alt="andriod" loading='lazy'/>
        </div>
        <div className='flex flex-col gap-3 mt-5'>
            <input type="text" placeholder={t('Name')} className='border border-gray-100 rounded-xl p-2 w-60 bg-blue-200' />
            <input type="text" placeholder={t('Phone number')} className='border border-gray-100 rounded-xl p-2 w-60 bg-blue-200' />
            <input type="text" placeholder={t('Email')} className='border border-gray-100 rounded-xl p-2 w-60 bg-blue-200' />
            <button className='bg-blue-700 w-max p-2 rounded-xl text-white flex text-center px-4 ml-20'>{t('send')}</button>

        </div>
        
    </div>
   
   
   
   
   </>
    )
}

export default React.memo(Eight);