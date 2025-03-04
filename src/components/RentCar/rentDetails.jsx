import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Payment from "./payment";
import Loader from "../load/Load";

const RentDetails = () => {

    const { id } = useParams();
    const [Rent, setRent] = useState({});
  const [loading, setLoading] = useState(true);
    


  
    useEffect(() => {
        const fetchRentDetails = async () => {
          const docRent = doc(db,'Rent', id);
          const docSnap = await getDoc(docRent);
    
          if (docSnap.exists()) {
            setRent(docSnap.data());
            setLoading(false);
            console.log(docSnap.data());
            localStorage.setItem("RentDetails", JSON.stringify(docSnap.data()));
          } else {
            console.log("No such document!");
          }
        };
    
        fetchRentDetails();
      }, [id]);
    


    return (
        <>
        {loading && <Loader />}

<div className={`m-auto my-16 mb-4 p-8`} style={{fontFamily:'cursive'}}>
  <h1 className="font-serif text-2xl text-blue-700 tracking-[8px] mb-8">Rent the car</h1>
  <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row items-center justify-center gap-20 ">
                <div className="flex flex-col">
                    <img src={Rent.img} alt="image" className='w-96 h-72 m-auto rounded-l-lg hover:scale-110 mb-8'  />
                    <h1 className="font-bold text-2xl text-blue-700">{Rent.title}</h1>
                    <p className='font-serif text-sm w-60 h-max p-4 text-center m-auto'>{Rent.text}</p>
                    <div className='flex gap-4 justify-center'>
                        <h1 className='font-semibold line-through'>${Rent.price}</h1>
                        <h1 className='font-semibold text-blue-700'>${Rent.new_price}</h1>
                    </div>
                </div>

       

        <div>
            <Payment />
        </div>
        </div>
        </div>

        </>
    )
}

export default RentDetails

