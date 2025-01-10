import { FaFacebookF, FaTwitter, FaInstagram,FaLocationArrow,FaPhoneAlt,FaVoicemail } from 'react-icons/fa';
import { IoCarSport } from "react-icons/io5";


const Footer = () => {
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
            <div className='flex gap-2 mb-2 relative bottom-4'>
                <FaLocationArrow className='text-2xl '/>
                <li className='text-sm font-thin'> hosary mosque, 6 october, cairo, egypt</li>
                </div>
                <div className='flex gap-2 mb-2'>
          <FaPhoneAlt className='text-2xl '/>
                <li className='text-sm font-thin'>+20123456789</li>
                </div>
                <div className='flex gap-2'>
        <FaVoicemail className='text-2xl '/>
                <li className='text-sm font-thin'>rentcars@gmail.com</li>
                </div>

              
           
            </ul>
          </div>


          <div>
            <h3 className="font-bold text-md mb-4">Our Products</h3>
            <ul>
            <li className='text-sm font-thin'>Career</li>
              <li className='text-sm font-thin'>Car</li>
              <li className='text-sm font-thin'>Packages</li>
              <li className='text-sm font-thin'>Features</li>
              <li className='text-sm font-thin'>Priceline</li>  
              </ul>
           
          </div>

   
          <div>
            <h3 className="font-bold text-md mb-4">Resources</h3>
            <ul>
            <li className='text-sm font-thin'>Why choose us</li>
              <li className='text-sm font-thin'>Our Story</li>
              <li className='text-sm font-thin'>Investor Relations</li>
              <li className='text-sm font-thin'>Press Center</li>
              <li className='text-sm font-thin'>Cruises</li> 
              <li className='text-sm font-thin'>Developer</li> 
              </ul>
            </div>
          

          <div>
            <h3 className="font-bold text-md mb-4"> About Rentcars </h3>
            <ul>
              <li className='text-sm font-thin'>download</li>
              <li className='text-sm font-thin'>Help Centre</li>
              <li className='text-sm font-thin'>Guides</li>
              <li className='text-sm font-thin'>Partner Network</li>
              <li className='text-sm font-thin'> Advertise</li>
                        
                        

            </ul>
          </div>

   
          <div>
            <h3 className="font-bold text-md mb-4">Follow Us</h3>
           
           <div className='flex gap-4 justify-center'>
           <FaFacebookF className="text-xl hover:text-blue-500"/>
           <FaTwitter className="text-xl hover:text-blue-400"/>
           <FaInstagram className="text-xl hover:text-pink-500"/>
           </div>
          </div>


        </div>

        <div className="text-center mt-10">
          <p>© 2025 My Website. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;

