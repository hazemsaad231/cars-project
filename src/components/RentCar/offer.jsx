import React, { useEffect, useState } from "react";
import { db, collection, getDocs } from "../firebase/firebase";
import { Link } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Loader from "../load/Load";
import { useLocation } from "react-router-dom";

const RentCar = () => {

  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    const Rentcars = await getDocs(collection(db,'Rent'));
    const carsList = Rentcars.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    setCars(carsList);
    localStorage.setItem("Rent", JSON.stringify(carsList));
    setLoading(false);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const role = localStorage.getItem("role");

  const [current, setCurrent] = useState(1);
  const itemsPerPage = 6;
  const lastIndex = current * itemsPerPage;
  const startIndex = lastIndex - itemsPerPage;
  const totalPages = Math.ceil(cars.length / itemsPerPage);
  const currentData = cars.slice(startIndex, lastIndex);
 
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "Rent", selectedDelete));
      setOpen(false);
      fetchCars();
      toast.success("Car deleted successfully!", { autoClose: 2000 });
    } catch (error) {
      console.error("Error deleting car: ", error);
    }
  };
  const handleClickOpen = (id) => {
    setOpen(true);
    setSelectedDelete(id);
  };

  const location = useLocation();
  
      useEffect(() => {
          if (location.state?.message) {
              toast.success(location.state.message, { autoClose: 2000 }); // عرض الرسالة
          }
      }, [location.state]);

  return (
    <>
      <ToastContainer />
      
      <div className="">
      {loading && <Loader />}
        <div>

 <div>
        <h1 className='font-bold text-2xl mt-16 mb-16 text-blue-700 tracking-[2px]' style={{fontFamily:"arial"}}>the most popular cars rental offers</h1>

        {
          role === "as6463275@gmail.com" || role === "hazemsaad231@gmail.com" ? (
            < div className="flex flex-col gap-4 justify-center mb-8" style={{fontFamily:"arial"}}>
                <Link to="/home/addRent" className="text-white py-2 px-4 rounded-md font-semibold text-md bg-blue-700 w-max m-auto">Add Car</Link>
               <h1 className="text-xl font-semibold text-blue-700" style={{fontFamily:"arial"}}>count or cars : {cars.length} </h1>
             </div>
       ):(null)}


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 place-items-center gap-12 m-auto w-[100%]" >
 {currentData.map((item) => (
            <div key={item.id} data-aos="fade-up" >
<div className="flex flex-col">
   <div className='flex pt-2'>
                    <img src={item.img} alt="image" className='w-96 h-80 m-auto rounded-l-lg  hover:scale-110'  />
                </div>    
                <div className='flex flex-col pt-2'>
                    <h1 className="font-bold text-xl text-blue-700">{item.title}</h1>
                    <p className='font-serif text-sm w-60 h-36 p-2 text-center m-auto '>{item.text}</p>
                    <div className='flex gap-4 justify-center'>
                        <h1 className='font-semibold line-through'>${item.price}</h1>
                        <h1 className='font-semibold text-blue-700'>${item.new_price}</h1>

                    </div>
                    <div className='flex justify-center mt-4'>
                          {role !== 'hazemsaad231@gmail.com' && role !== 'as6463275@gmail.com' ? 
                                          (<button className='bg-blue-700 w-max m-auto rounded-lg p-3 mb-3 hover:bg-blue-800 text-white'>
                                           <Link to={`/home/rent/${item.id}`}>Rent Now</Link>
                                          </button>
                                        ) : (
                                          <div className="flex gap-2 mx-2">
                                            <button className='bg-blue-700 w-full m-auto rounded-lg p-3 mb-3 hover:bg-blue-800 text-white'>
                                              <Link to={`/home/addRent/${item.id}`}>update</Link>
                                            </button>
                                            <button className='bg-red-500 w-full m-auto rounded-lg p-3 mb-3 hover:bg-red-800 text-white' onClick={() => handleClickOpen(item.id)}>delete</button>
                                          </div>
                                        )}
                    </div>
                </div>
</div>
             
            </div>
        ))}

        </div>
   
        </div>
























    


          <div className="flex justify-center mt-4 mb-8">
              <button
                onClick={() => setCurrent(current > 1 ? current - 1 : current)}
                className="px-1 py-2 mx-1 text-white bg-blue-700 rounded hover:bg-blue-600"
                disabled={current === 1}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index + 1)}
                  className={`px-1 py-2 mx-1 rounded ${current === index + 1 ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-gray-300'}`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrent(current < totalPages ? current + 1 : current)}
                className="px-1 py-2 mx-1 text-white bg-blue-700 hover:bg-blue-600 rounded"
                disabled={current === totalPages}
              >
                Next
              </button>
            </div>





        </div>
      </div>

      {/* Confirmation Modal */}
      <React.Fragment>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog variant="outlined" role="alertdialog">
            <DialogTitle>Confirmation</DialogTitle>
            <Divider />
            <DialogContent>Are you sure you want to delete?</DialogContent>
            <DialogActions>
              <Button variant="solid" color="danger" onClick={() => handleDelete()}>Delete</Button>
              <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>Cancel</Button>
            </DialogActions>
          </ModalDialog>
        </Modal>
      </React.Fragment>
    </>
  );
};

export default RentCar;

