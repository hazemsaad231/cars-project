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
import { FaPenToSquare } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Loader from "../load/Load";



export default function Rentings() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

   const [open, setOpen] = useState(false);
   const [selectedDelete, setSelectedDelete] = useState(null);
   
  

  const fetchCars = async () => {
    const Allcars = await getDocs(collection(db, "Rent_orders"));
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
       await deleteDoc(doc(db, "Rent_orders", selectedDelete));
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
    <div>
      
      <ToastContainer />
      {loading ? <Loader />:
      <TableContainer component={Paper} sx={{ width: '80%', margin: 'auto', marginTop: '20px' , marginBottom: '20px' ,backgroundColor: 'rgba(255, 255, 255, 0.7)', boxShadow: '10px 10px 10px 10px rgba(0.1, 0.1, 0.1, 0.1)'}} data-aos="fade-up">
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ textAlign: 'center', margin: 'auto', marginBottom: '40px', fontFamily: 'serif', letterSpacing: '2px' }}
        >
          List of rented cars
        </Typography>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow >
            <TableCell align="center">Car</TableCell>
            <TableCell align="center">Car Type</TableCell>
              {/* <TableCell align="center">Booking ID</TableCell> */}
              <TableCell align="center">Full Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">City</TableCell>
              <TableCell align="right">PackupTime</TableCell>
              <TableCell align="right">ReturnTime</TableCell>
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

<TableCell align="center">
                  
                    <img src={car.carDetails.img} alt="Car" style={{ width: '100px', height: '100px' }} />
                  
                </TableCell>
                <TableCell align="center">{car.carDetails.title}</TableCell>


                {/* <TableCell component="th" scope="row" align="center">{car.id}</TableCell> */}
                <TableCell align="center">{car.delivery_address.fullName}</TableCell>
                <TableCell align="center">{car.delivery_address.email}</TableCell>
                <TableCell align="center">{car.delivery_address.city}</TableCell>
                <TableCell align="right">{car.delivery_address.PickupDate}</TableCell>
                <TableCell align="right">{car.delivery_address.ReturnDate}</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}


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
              }
              }>Delete</Button>
              <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>Cancel</Button>
            </DialogActions>
          </ModalDialog>
        </Modal>
      </React.Fragment>


    </div>
  );
}





