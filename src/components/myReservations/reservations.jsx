import * as React from 'react';
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography} from '@mui/material';
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import Loader from '../load/Load';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { useContext } from "react";
import { Context } from "../context/Context";





const MyOrders = () => {

  const { id: userId } = useParams();
  const [orders, setOrders] = useState([]);
  
  const [loading, setLoading] = useState(true);
   const [open, setOpen] = useState(false)

   const [selectedDelete, setSelectedDelete] = useState(null);
   const isBooked = localStorage.getItem("isBooked");



   

  useEffect(() => {
    if (!userId) {
      console.error("Invalid userId");
      return;
    }
  
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, "orders"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const ordersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    }
    fetchOrders();
  }, [userId]); // يعتمد على userId
  
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db,"orders", selectedDelete));
      setOpen(false);
      fetchOrders();
      toast.success("Reservation deleted successfully!", { autoClose: 2000 });
    } catch (error) {
      console.error("Error deleting car: ", error);
    }
  };

  const handleClickOpen = (id) => {
    setOpen(true);
    setSelectedDelete(id);
  };
 

 
  const {handleBook} = useContext(Context);



  return (
    <>
    <ToastContainer/>
    {loading ? <Loader />:
    <TableContainer component={Paper} sx={{ width: '80%', margin: 'auto', marginTop: '100px', marginBottom: '100px' ,backgroundColor: 'rgba(255, 255, 255, 0.7)', boxShadow: '10px 10px 10px 10px rgba(0.1, 0.1, 0.1, 0.1)'}} data-aos="fade-up">
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ textAlign: 'center', margin: 'auto', marginBottom: '40px', fontFamily: 'serif', letterSpacing: '2px' }}
        >
          My Reservations
        </Typography>
        
        {orders.length === 0 ? (
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', margin: 'auto', marginBottom: '40px', fontFamily: 'serif', letterSpacing: '2px' }}>
            You have no reservations
          </Typography>
        ):
        <Table sx={{ minWidth: 650 ,width: '100%',border:'collapse' }} aria-label="simple table">
          <TableHead>
            <TableRow >
            <TableCell align="center">Car</TableCell>
              <TableCell align="center">Type of Car</TableCell>
              <TableCell align="center">Price of Car </TableCell>
              <TableCell align="center">Model of Car </TableCell>
              <TableCell align="center">Booking ID</TableCell>
              <TableCell align="center">Receipt Time</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((car) => (
              <TableRow
                key={car.id}
              >
                 <TableCell align="center">
                  {car.carDetails.img?.[0] ? (
                    <img src={car.carDetails.img[0]} alt="Car" style={{ width: '80px', height: '80px' , margin: 'auto' }} />
                  ) : "No Image"}
                </TableCell>
                <TableCell align="center">{car.carDetails.car}</TableCell>
                <TableCell align="center">{car.carDetails.price}</TableCell>
                <TableCell align="center">{car.carDetails.car_model_year}</TableCell>
                <TableCell component="th" scope="row" align="center">{car.carDetails.id}</TableCell>
                <TableCell align="center">
                  {new Date(car.delivery_address.ReceiptTime).toLocaleDateString()}
                </TableCell>
               
                <TableCell align="center">
                  <MdDelete 
                    style={{ cursor: 'pointer', margin: 'auto' }} 
                    size={25} 
                    onClick={() => handleClickOpen(car.id)} 
                  />
                </TableCell>
{/* Confirmation Modal */}
<React.Fragment>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog variant="outlined" role="alertdialog">
            <DialogTitle>Confirmation</DialogTitle>
            <Divider />
            <DialogContent>Are you sure you want to delete?</DialogContent>
            <DialogActions>
              <Button variant="solid" color="danger" onClick={() =>{
               handleDelete() 
               handleBook(car.carId,isBooked)
              }}>Delete</Button>
              <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>Cancel</Button>
            </DialogActions>
          </ModalDialog>
        </Modal>
      </React.Fragment>

              </TableRow>
            ))}
          </TableBody>
        </Table>}
      </TableContainer>
      }
    </>
  );
};

export default React.memo(MyOrders); 
