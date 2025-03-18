import ios from '../../../src/assets/img/ios.png'
import iphone from '../../../src/assets/img/iPhone.png'
import andriod from '../../../src/assets/img/andriod.png'

const Eight = () => {
    return (
   <>
   
   <div className='mt-16 ml-16 text-start' data-aos="zoom-in" style={{ fontFamily: "arial" }}>
        <h1 className='font-semibold text-4xl mb-3'> Download Rentcars App for <span className='text-blue-700'>FREE</span> </h1>
        <p className='text-gray-500 text-sm'>For faster, easier booking and exclusive deals.</p>
        <div>
            <img src={iphone}
             alt="" 
             className='absolute right-[5%] w-[20%] h-80 hidden sm:hidden md:hidden lg:block xl:block'
             loading='lazy' />
        </div>


        <div className='flex gap-5 mt-5' id='contact' data-aos="zoom-in">
            <img src={ios} alt="" loading='lazy'/>
            <img src={andriod} alt="" loading='lazy'/>
        </div>
        <div className='flex flex-col gap-3 mt-5'>
            <input type="text" placeholder='Name' className='border border-gray-100 rounded-xl p-2 w-60 bg-blue-200' />
            <input type="text" placeholder='Phone number' className='border border-gray-100 rounded-xl p-2 w-60 bg-blue-200' />
            <input type="text" placeholder='Email' className='border border-gray-100 rounded-xl p-2 w-60 bg-blue-200' />
            <button className='bg-blue-700 w-max p-2 rounded-xl text-white flex text-center px-4 ml-20'>send</button>

        </div>
    </div>
   
   
   
   
   </>
    )
}

export default Eight;