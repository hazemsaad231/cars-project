import bg from '../../assets/img/car.png';

const One = () => {


  



    return (
        <>
            <div
                className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mb-60'
               
            >
                <div className='mt-40 text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-4xl text-blue-600 '>
                    <h1 className='son font-extrabold'>
                        Find, book and rent
                        <div>
                            a car <span className='text-blue-500'>Easily</span>
                        </div>
                    </h1>
                    <p className='mt-4 font-serif w-[90%] m-auto text-sm sm:text-sm md:text-base lg:text-lg xl:text-xl'>
                        Get a car wherever and whenever you need it with your iOS and Android.
                    </p>
                </div>
                <div className='father pt-10'>
                    <img src={bg} alt="bg" id='bg' />
                </div>
            </div>
        </>
    );
};

export default One;






{/* <div className='father'>
                    <img src={bg} alt="bg" id='bg' />
                </div> */}