import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, Typography, Grid, TextField , FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc} from "firebase/firestore";
import  {Context}  from '../context/Context';
import React, {useContext} from "react";
import { useState } from 'react';
import Wait from './paymentLoad';
import { useTranslation } from 'react-i18next';
  

const Payment = ({carId})=> {


  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()

const [loading, setLoading] = useState(false);

 const carDetails = JSON.parse(localStorage.getItem("carDetails"));

 const{handleBook} = useContext(Context);

const Id = localStorage.getItem("Id");



const isBooked = localStorage.getItem("isBooked");


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    console.log(cardElement);


    if (cardElement) {
      const { error, token } = await stripe.createToken(cardElement);
      if (error) {
        toast.error(error.message, { autoClose: 2000 });
      }else{
        setLoading(true)
        handleBook(carId, isBooked==="true"?true:false);

      }

        if (!Id) {
          toast.error("Please log in to place an order.");
          return;
        }

        const id = Id;
        const data = {
          token: 'tok_visa',
          delivery_address: {
           fullName: event.target.fullName.value,
            email: event.target.email.value,
            phone: event.target.phone.value,
            city: event.target.city.value,
            address: event.target.address.value,
            ReceiptTime: event.target.ReceiptTime.value,
            PartialPayment: event.target.PartialPayment.value,
            building: 1,
            floor: 1,
            apartment: 1,
            additional_info: 'test info',
            location: {
              type: "Point",
              coordinates: [30.0444, 31.2357],
            },
          },
          carDetails,
        };

        try {
          // إضافة بيانات الطلب إلى Firestore
          const orders = collection(db, "orders");
          await addDoc(orders, {
            userId: id,
            token: token?.id,
            delivery_address: data.delivery_address,
            carDetails: data.carDetails,
            timestamp: new Date(),
            carId:carId,
          
          
          });


          setTimeout(() => {
            toast.success(t('Order placed successfully!'), { autoClose: 2500 });
          }, 2500)
          
          setTimeout(() => {
           
            navigate("/complete",{state:{carDetails}})
          }, 4500);
        } catch (error) {
          console.error("error", error);
          setLoading(false)
        } 
      }
    } 
  
  

    const { t } = useTranslation();
  return (
    <>


      <ToastContainer />
        <div>
          <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>

          <div className="text-center rounded-lg shadow-xl p-4 bg-gradient-to-l from-transparent to-gray-50">
          <Typography variant="h5" gutterBottom sx={{ letterSpacing: 2 , color: "black"}}>
            {t('Payment Details')}
              </Typography>

<div className="bg-transparent p-8 text-center rounded-lg shadow-xl border">
              <Typography variant="h5" gutterBottom>
              
              </Typography>
              <Grid item xs={8}>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3'>
              <TextField
                  name="fullName"
                  label={t('Full Name')}
                  fullWidth
                  variant='standard'
      
                  margin="normal"
                />

                <TextField
                  name='email'
                  label={t('Email')}
                  variant='standard'  
                  fullWidth
                  margin="normal"
                />

                <TextField
                  name='phone'
                  label={t('Phone')}
                  fullWidth
                  variant='standard'
                  margin="normal"
                />

                <TextField
                  name='city'
                  label= {t('City')}
                  variant='standard'
                  fullWidth
      
                  margin="normal"
                />

                <TextField
                  name='address'
                  label= {t('Address')}
                  fullWidth
                  margin="normal"
                  variant='standard'
                />  

                <TextField
                  name='ReceiptTime'
                  label= {t('Receipt Time')}
                  type="date"
                  variant='standard'
                  fullWidth
                  margin="normal"
                />

<FormControl fullWidth margin="normal" variant='standard'>
                  <InputLabel id="demo-simple-select-label">{t('partial payment')}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="PartialPayment"
                    label="Payment Type"
                    style={{ textAlign: "left" }}
                  >
                    <MenuItem value="Full Payment">5,000</MenuItem>
                    <MenuItem value="Partial Payment">10,000</MenuItem>
                    <MenuItem value="Partial Payment">15,000</MenuItem>

                  </Select>
                </FormControl>

               
                </div>
              </Grid>
            </div>

<div className="bg-transparent p-2 m-4 text-center rounded-lg shadow-xl">
              <Typography variant="h5" gutterBottom sx={{ letterSpacing: 4 , color: "black"}}>
                {t('Payment Method')}
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12}>
                  <Box sx={{ border: '1px solid #ccc', borderRadius: 1, padding: 2}}>
                    <CardElement options={{ hidePostalCode: true }} />
                  </Box>
                </Grid>
              </Grid>
            </div>

        


            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ m: 2, width: 200 , margin: "auto"}}
              disabled={!stripe}
              >
             {loading ? <Wait /> : t('Pay Now')}

            </Button>
            
          
</div>

   
          </Box>
        </div>
    
    </>
  );
};

export default React.memo(Payment); // استخدام React.memo للحفظ من التكرار الذاتي للعنصر Payment;
