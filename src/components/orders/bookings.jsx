import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, MenuItem, Select } from '@mui/material';
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import {  toast } from 'react-toastify';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Loader from "../load/Load";
import { useContext } from "react";
import Rentings from './rentings';
import { Context } from '../context/Context';


export default function Bookings() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

   const [open, setOpen] = useState(false);
   const [selectedDelete, setSelectedDelete] = useState(null);
   
  const {handleBook,Id} = useContext(Context);
  const isBooked = localStorage.getItem("isBooked");


  const fetchCars = async () => {
    const Allcars = await getDocs(collection(db, "orders"));
    const carsList = Allcars.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
   
    setCars(carsList);
    setLoading(false);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Handle Delete
   const handleDelete = async () => {
     try {
       await deleteDoc(doc(db, "orders", selectedDelete));
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
 

  // Handle Status Change
  const handleStatusChange = async (id, newStatus) => {
    try {
      const carDoc = doc(db, "orders", id);
      await updateDoc(carDoc, { status: newStatus });
      setCars(cars.map(car => car.id === id ? { ...car, status: newStatus } : car));
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  return (
    <div className='py-20'>
            {loading ? <Loader />:
      <TableContainer component={Paper} sx={{ width: '80%', margin: 'auto', marginTop: '20px' ,backgroundColor: 'rgba(255, 255, 255, 0.7)', boxShadow: '10px 10px 10px 10px rgba(0.1, 0.1, 0.1, 0.1)'}} data-aos="fade-up">
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ textAlign: 'center', margin: 'auto', marginBottom: '40px', fontFamily: 'serif', letterSpacing: '2px' }}
        >
          List of Booked cars
        </Typography>
        <Table sx={{ minWidth: 650 ,width: '100%',border:'collapse' }} aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell align="center">Booking ID</TableCell>
              <TableCell align="center">Full Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">City</TableCell>
              <TableCell align="right">Receipt Time</TableCell>
              <TableCell align="center">Car</TableCell>
              <TableCell align="center">Car Type</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((car) => (
              <TableRow
                key={car.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  textDecoration: car.status === 'completed' ? 'line-through' : 'none', // إضافة خط عند اكتمال الحالة
                  color: car.status === 'completed' ? 'blue' : 'inherit', // 
                }}
              >
                <TableCell component="th" scope="row" align="center">{car.carDetails.id}</TableCell>
                <TableCell align="center">{car.delivery_address.fullName}</TableCell>
                <TableCell align="center">{car.delivery_address.email}</TableCell>
                <TableCell align="center">{car.delivery_address.city}</TableCell>
                <TableCell align="right">
                  {new Date(car.delivery_address.ReceiptTime).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  {car.carDetails.img?.[0] ? (
                    <img src={car.carDetails.img[0]} alt="Car" style={{ width: '50px', height: '50px' }} />
                  ) : "No Image"}
                </TableCell>
                <TableCell align="center">{car.carDetails.car}</TableCell>
                <TableCell align="center">
                  <Select
                    value={car.status}
                    defaultValue={car.status}
                    onChange={(e) => handleStatusChange(car.id, e.target.value)}
                    displayEmpty
                    size="small"
                  >
                    <MenuItem value="confirmed">Confirmed</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
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
        </Table>
      </TableContainer>}




<Rentings/>
    </div>
  );
}


