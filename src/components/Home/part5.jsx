import { Brands } from "./data";

const Brand = () => {


    return (

        <div data-aos="fade-up" className="my-20">

            <h1 className='font-bold text-2xl mb-16 mt-8 text-blue-700 tracking-[5px]'style={{ fontFamily: "arial" }}>Popular Brands</h1>
            <div  className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 place-items-center gap-12 w-[90%] m-auto cursor-pointer">
            {Brands.map(({item , icon: Icon}) => (
                <div key={item} className="border border-gray-300 rounded-lg p-4 bg-transparent" id="btn"> <Icon size={100} className=' text-blue-700 m-auto'/></div>
            ))}
            </div>


        </div>
    )
}

export default Brand;