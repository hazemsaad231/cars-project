import React, { useEffect, useState } from "react";
import { db, collection, getDocs} from "../firebase/firebase";
import { Link } from "react-router-dom";
import air from '../../../src/assets/img/air.png';
import frame from '../../../src/assets/img/frame.png';
import { FaUserAlt } from "react-icons/fa";
import star from '../../../src/assets/img/star.png';
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
import { useContext} from 'react';
import { Context } from '../context/Context';
import { HiOutlineLockClosed } from "react-icons/hi";
import { useLocation } from "react-router-dom";


const AllCars = () => {

  const [cars, setCars] = useState([]);
  const [value, setValue] = useState('');
  const [mood, setMood] = useState('car'); // الوضع الافتراضي
  const [open, setOpen] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isDarkMode} = useContext(Context);




   const location = useLocation();
  
      useEffect(() => {
          if (location.state?.message) {
              toast.success(location.state.message, { autoClose: 2000 }); // عرض الرسالة
          }
      }, [location.state]);
  

  const fetchCars = async () => {
    const Allcars = await getDocs(collection(db, "cars"));
    const carsList = Allcars.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    setCars(carsList);
    localStorage.setItem("cars", JSON.stringify(carsList));
    setLoading(false);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const role = localStorage.getItem("role");

  
  const search = () => {
    if (mood === 'price') {
      return cars.filter((item) => {
        const price = parseFloat(item.price);  // تحويل السعر إلى رقم
        const enteredValue = parseFloat(value); 

        if(value === '') {
          return true;
        }
        return price <= enteredValue; // تحقق من أن السعر أقل من أو يساوي القيمة المدخلة
      });
    }
  
    return cars.filter((item) =>
      item[mood]?.toString().toUpperCase().startsWith(value?.toString().toUpperCase()) // الشرط للنصوص
    );
  };
  

  const filterData = search()
  const [current, setCurrent] = useState(1);
  const itemsPerPage = 12;
  const lastIndex = current * itemsPerPage;
  const startIndex = lastIndex - itemsPerPage;
  const totalPages = Math.ceil(filterData.length / itemsPerPage);
  const currentData = filterData.slice(startIndex, lastIndex);
 
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "cars", selectedDelete));
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




  return (
  <>
      <ToastContainer />
<div>
{loading ? <Loader />:

        <div>
        
        <h2 className='text-2xl text-blue-700 font-bold p-8 tracking-[2px]' style={{ fontFamily: 'arial' }}>The popular cars booking offers</h2><div className='mt-10'>
              {/* حقل البحث */}
              <input
                type="text"
                placeholder={`Search by ${mood}`}
                className='w-[60%] p-1.5 mt-4 shadow-2xl border  rounded-l-lg outline-blue-700 text-gray-400'
                value={value}
                onChange={(e) => setValue(e.target.value)} />

              {/* قائمة التبديل */}
              <select
                className='w-[15%] p-1.5 mt-4 shadow-2xl border-transparent text-center rounded-r-lg bg-blue-600 text-white '
                value={mood}
                onChange={(e) => setMood(e.target.value)}
              >
                <option value="car">Search by car</option>
                <option value="price">Search by price</option>
                <option value="car_color">Search by color</option>
                <option value="car_model_year">Search by model</option>
              </select>
            </div>


            {role === "as6463275@gmail.com" || role === "hazemsaad231@gmail.com" && (
              <div className="flex flex-col justify-center items-center" style={{ fontFamily: 'arial' }}>
                <button className="text-white w-52 text-xl h-10 mt-6 bg-blue-600 text-center rounded-lg hover:bg-blue-700"><Link to={"/home/addCar"}>add new car</Link></button>
                <h1 className="text-xl font-semibold text-blue-700 tracking-tighter">count or cars : {cars.length} </h1>

              </div>
            )}


            <div className="w-full sm:w-full md:w-full lg:w-full xl:w-[80%] m-auto">

              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-10 gap-4 justify-items-center place-items-center' data-aos="fade-up">
                {currentData.map((el, index) => (
                  <div key={el.id || index} className={`flex flex-col text-center mb-2 shadow-xl hover:shadow-2xl transition duration-500 w-[95%] gap-2 justify-between opacity-90 hover:opacity-100  ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} `}>

                    {/* <img
                      src={el.img[0]}
                      alt={el.car}
                      className="w-full h-60 mb-4 m-auto shadow-lg hover:scale-105 transform transition duration-300" /> */}

<div class="w-full h-60 overflow-hidden rounded-lg">
  <img 
    src={el.img[0]} 
    alt="Zoom" 
    class="w-full h-full object-center transform hover:scale-110 transition duration-500"
  />
</div>




                    {el.isBooked === true ? (
                      <p className='text-center text-lg font-semibold bg-red-600 text-white shadow-xl'>Booked</p>
                    ) : (
                      <p className='text-center text-lg font-semibold bg-green-600 text-white'>Available</p>
                    )}
                    <h2 className='text-start font-semibold text-xl mt-2 ml-3 mb-2'>{el.car}</h2>
                    <div className='flex gap-.5 px-4'>
                      <img src={star} alt="" className='w-5 h-5' />
                      <span className='font-bold'>{el.evaluation}</span>
                      <span className='font-thin'> ({el.reviews} reviews)</span>
                    </div>
                    <div className='flex justify-between px-3'>
                      <div className='flex gap-1'>
                        <FaUserAlt className='text-xl' />
                        <span className='text-sm font-thin'>4 Passanger</span>
                      </div>
                      <div className='flex'>
                        <img src={air} alt="" className='w-5 h-6' />
                        <span className='text-sm font-thin'>Air condtioning</span>
                      </div>
                    </div>
                    <div className='flex font-thin justify-between px-3'>
                      <div className='flex mx-1'>
                        <span className='font-thin text-sm'>{el.carType}</span>
                      </div>
                      <div className='flex ml-28'>
                        <img src={frame} alt="" className='w-5 h-5' />
                        <span className='text-sm'>{el.car_model_year}</span>
                      </div>
                    </div>
                    <hr style={{ height: '2px', width: '100%', backgroundColor: 'gray', margin: 'auto' }} />
                    <div className='flex justify-between px-3'>
                      <h5 className='font-serif'>price</h5>
                      <h5 className='font-bold'>{el.price}$</h5>
                    </div>
                    <br />
                    {role !== 'as6463275@gmail.com' && role !== 'hazemsaad231@gmail.com' ? (
                  <button className='bg-blue-700 w-max m-auto rounded-lg p-3 mb-3 hover:bg-blue-800 text-white'>
                    {el.isBooked === true ? <HiOutlineLockClosed size={25} color="white" className="w-20 animate-bounce" /> :
                    <Link to={`/home/details/${el.id}`}>view details</Link>}
                  </button>):
                  (
                     <div className="grid grid-cols-3 gap-2 p-2 place-items-center">
                        <button className='bg-blue-700 w-full m-auto rounded-lg p-3 mb-3 hover:bg-blue-800 text-white'
                          onClick={() => handleShow()}>
                          <Link to={`/home/addCar/${el.id}`}>update</Link>
                        </button>
                        <button className='bg-red-500 w-full m-auto rounded-lg p-3 mb-3 hover:bg-red-800 text-white'
                          onClick={() => handleClickOpen(el.id)}>delete</button>
                        <button className='bg-blue-700 m-auto  w-full rounded-lg p-3 mb-3 hover:bg-blue-800 text-white'>
                          <Link to={`/home/details/${el.id}`}>Details</Link>
                        </button>
                      </div>
                      )}

                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-4 mx-8 mb-8">
              <button
                onClick={() => setCurrent(current > 1 ? current - 1 : current)}
                className="px-2 py-2 mx-1 text-white bg-blue-700 rounded hover:bg-blue-600"
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
                className="px-2 py-2 mx-1 text-white bg-blue-700 hover:bg-blue-600 rounded"
                disabled={current === totalPages}
              >
                Next
              </button>
            </div>

  
      
          


    </div>
    
  }
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

export default AllCars;


