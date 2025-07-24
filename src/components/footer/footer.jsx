import { FaFacebookF, FaTwitter, FaInstagram,FaLocationArrow,FaPhoneAlt,FaVoicemail } from 'react-icons/fa';
import { IoCarSport } from "react-icons/io5";
import { useTranslation } from 'react-i18next';


const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className='w-full bg-gradient-to-b from-gray-700 to-gray-900 flex justify-center mt-10' id='contact'>
    <footer className="bg-gradient-to-b from-gray-700 to-gray-900 text-white py-10" style={{fontFamily:"arial"}}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">

          <div>

            <div className='flex gap-6'>
            <IoCarSport className='text-8xl relative bottom-8'/>
            <h3 className="font-bold text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg">RENTCARS</h3>
            </div>
          

            <ul>

          <li>
          <div className='flex gap-2 mb-2 relative bottom-4'>
                <FaLocationArrow className='text-2xl '/>
                <h2 className='text-sm font-thin'> {t('address')}</h2>
                </div>
            </li>  
<li>

<div className='flex gap-2 mb-2'>
          <FaPhoneAlt className='text-2xl '/>
                <h2 className='text-sm font-thin'>{t('phone')}</h2>
                </div>
</li>

<li>

<div className='flex gap-2'>
        <FaVoicemail className='text-2xl '/>
                <h2 className='text-sm font-thin'>{t('email')}</h2>
                </div>
</li>

            </ul>

          </div>


          <div>
            <h3 className="font-bold text-md mb-4">{t('products')}</h3>
            <ul>
            <li className='text-sm font-thin'>{t('career')}</li>
              <li className='text-sm font-thin'>{t('car')}</li>
              <li className='text-sm font-thin'>{t('packages')}</li>
              <li className='text-sm font-thin'>{t('features')}</li>
              <li className='text-sm font-thin'>{t('priceline')}</li>  
              </ul>
           
          </div>

   
          <div>
            <h3 className="font-bold text-md mb-4">{t('resources')}</h3>
            <ul>
            <li className='text-sm font-thin'>{t('whyChooseUs')}</li>
              <li className='text-sm font-thin'>{t('ourStory')}</li>
              <li className='text-sm font-thin'>{t('investorRelations')}</li>
              <li className='text-sm font-thin'>{t('pressCenter')}</li>
              <li className='text-sm font-thin'>{t('cruises')}</li> 
              <li className='text-sm font-thin'>{t('developer')}</li> 
              </ul>
            </div>
          

          <div>
            <h3 className="font-bold text-md mb-4">{t('aboutRentcars')}</h3>
            <ul>
              <li className='text-sm font-thin'>{t('download')}</li>
              <li className='text-sm font-thin'>{t('helpCentre')}</li>
              <li className='text-sm font-thin'>{t('guides')}</li>
              <li className='text-sm font-thin'>{t('partnerNetwork')}</li>
              <li className='text-sm font-thin'> {t('advertise')}</li>
                        
                        

            </ul>
          </div>

   
          <div>
            <h3 className="font-bold text-md mb-4">{t('followUs')}</h3>
           
           <div className='flex gap-4 justify-center'>
           <FaFacebookF className="text-xl hover:text-blue-500"/>
           <FaTwitter className="text-xl hover:text-blue-400"/>
           <FaInstagram className="text-xl hover:text-pink-500"/>
           </div>
          </div>


        </div>

        <div className="text-center mt-10">
          <p>{t('© 2025 My Website. All rights reserved.')}</p>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;

