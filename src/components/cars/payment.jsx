import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, Grid, TextField , FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc} from "firebase/firestore";
import {Context} from "../context/Context";
import{useContext} from "react";
import { useState } from 'react';
import Wait from './paymentLoad';
import { useTranslation } from 'react-i18next';
import { db } from "../firebase/firebase";
import { useForm } from 'react-hook-form';
import { LuDelete } from "react-icons/lu";




const Payment = ({carDetails, carId,toggleDetails}) =>{

const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()

const { t } = useTranslation();
 localStorage.setItem("isBooked", carDetails.isBooked);

 const{handleBook} = useContext(Context);

const Id = localStorage.getItem("Id");

console.log(carId);

  const [loaded, setLoaded] = useState(false);
  const isBooked = localStorage.getItem("isBooked");


  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      city: '',
      address: '',
      ReceiptTime: '',
      PartialPayment: '5,000',
    },
  });
  const onSubmit = async (data) => {

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
        setLoaded(true)
        handleBook(carId, isBooked==="true"?true:false);

      }

        if (!Id) {
          toast.error("Please log in to place an order.");
          return;
        }

const orderId = Math.floor(Math.random() * 100000);


        const Data = {
          token: 'tok_visa',
          delivery_address: {
           fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            city: data.city,
            address: data.address,
            ReceiptTime: data.ReceiptTime,
            PartialPayment: data.PartialPayment,
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
          orderId
         
        };

        try {
          // إضافة بيانات الطلب إلى Firestore
          const orders = collection(db, "orders");
          await addDoc(orders, {
            userId: Id,
            token: token?.id,
            delivery_address: Data.delivery_address,
            carDetails: Data.carDetails,
            timestamp: new Date(),
            carId:carId,
            orderId: Data.orderId,
          });

          console.log("Order placed successfully!", Data);


          setTimeout(() => {
            toast.success(t('Order placed successfully!'), { autoClose: 2500 });
          }, 2000)
          
          setTimeout(() => {
            navigate("/complete",{state:{carDetails , orderId}})
          }, 4000)

        } catch (error) {
          console.error("error", error);
          setLoaded(false)
        } 
      }
    }


  return (
<div>
             <div>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ px: 2 , position: 'relative' }}>
<h2 className="text-2xl font-bold cursor-pointer absolute top-0 right-0"
onClick={toggleDetails}><LuDelete/></h2>
             <Grid container spacing={1}>
 <h1 className="text-xl md:text-2xl lg:text-3xl font-bold m-auto text-gray-800">
                    {t('Payment Details')}
                  </h1>

             <Grid item xs={12} className="grid grid-cols-1 md:grid-cols-2 gap-x-4 pb-6">
           <TextField
              name="fullName"
               label={t('Full Name')}
                fullWidth
                   variant='standard'
                 margin="normal"
                {...register('fullName', { required: true })}
                error={!!errors.fullName}
                helperText={errors.fullName ? t('Full Name is required') : ''}
           />

               <TextField
                name='email'
                label={t('Email')}   
                variant='standard'  
                fullWidth                 
                margin="normal" 
                {...register('email', { required: true })}
                error={!!errors.email}
                helperText={errors.email ? t('Email is required') : ''}
                />
               <TextField    
               name='phone'           
                label={t('Phone')}
                fullWidth
                variant='standard'               
                margin="normal"      
                {...register('phone', { required: true })}
                error={!!errors.phone}
                helperText={errors.phone ? t('Phone is required') : ''}      
                   />

         <TextField
                  name='city'
                  label= {t('City')}
                  variant='standard'
                  fullWidth
                  margin="normal"
                  {...register('city', { required: true })}
                  error={!!errors.city}
                  helperText={errors.city ? t('City is required') : ''}
                />

                <TextField
                  name='address'
                  label= {t('Address')}
                  fullWidth
                  margin="normal"
                  variant='standard'
                  {...register('address', { required: true })}
                  error={!!errors.address}
                  helperText={errors.address ? t('Address is required') : ''}
                />  

                <TextField
                  name='ReceiptTime'
                  label= {t('Receipt Time')}
                  type="date"
                  variant='standard'
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  {...register('ReceiptTime', { required: true  })}
                  error={!!errors.ReceiptTime}
                  helperText={errors.ReceiptTime ? t('Receipt Time is required') : ''}
                  inputProps={{
    min: new Date(Date.now()+ 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 👈 يمنع الأيام اللي قبل النهاردة
  }}
             />

<FormControl fullWidth margin="normal" variant='standard'>
                  <InputLabel id="demo-simple-select-label">{t('partial payment')}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="PartialPayment"
                    label="Payment Type"
                    style={{ textAlign: "left" }}
                    {...register('PartialPayment', { required: true })}
                    error={!!errors.PartialPayment}
                    helperText={errors.PartialPayment ? t('Partial Payment is required') : ''}
                    defaultValue="5,000"
                    >
                    <MenuItem value="5,000">5,000</MenuItem>
                    <MenuItem value="10,000">10,000</MenuItem>
                    <MenuItem value="15,000">15,000</MenuItem>

                 </Select>
               </FormControl>


 <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Box sx={{ border: '1px solid #ccc', borderRadius: 1, padding: 2}}>
                   <CardElement options={{ hidePostalCode: true }} />
                </Box>
              </Grid>
             </Grid>
            </Grid>
            
            <Button
             type="submit"
             variant="contained"      
              color="primary"
           fullWidth
           sx={{ marginTop: 4, width: 200 , margin: "auto"}}
          disabled={!stripe}
              >
              {loaded ? <Wait /> : t('Pay Now')}

             </Button>


               </Grid>
   
           </Box>
     </div>



</div>
  )



}

export default Payment;

