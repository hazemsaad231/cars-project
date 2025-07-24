import { useTranslation } from 'react-i18next';


const One = () => {

    const { t } = useTranslation();
   

    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mb-60'>
                <div className='mt-40 text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-4xl text-blue-600 '>
                    <h1 className='son font-extrabold w-[75%] m-auto'>
                       {t('Find, book and rent a car Easily')}
                    </h1>
                    <p className='mt-4 font-serif w-[75%] m-auto text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl'>
                        {t('Get a car wherever and whenever you need it with your iOS and Android.')}
                    </p>
                </div>
                <div className='pt-10 sm:pt-10 md:pt-24 lg:pt-20 xl:pt-10'>
                    <img src='/car.webp' alt="bg" id='bg'/>
                </div>
            </div>
        </>
    );
};

export default One;





