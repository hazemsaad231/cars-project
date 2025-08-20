import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, Typography, Grid, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../firebase/firebase';
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Wait from './paymentLoad';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';



function Payment() {


const { register, handleSubmit, formState: { errors } } =  useForm({
  defaultValues: {
    fullName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    PickupDate: "",
    ReturnDate: "",
    PartialPayment: "20",
  },
});

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);


const Id = localStorage.getItem("Id");
const carDetails = JSON.parse(localStorage.getItem("RentDetails"));

console.log(carDetails);
  const onSubmit = async (data) => {


    if (!stripe || !elements) {
      toast.error("not loaded stripe");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    console.log(cardElement);


    if (cardElement) {
      const { error, token } = await stripe.createToken(cardElement);


     

      if (error) {
        toast.error(error.message);
        return;
      }else{
        setLoading(true)

      }

        if (!Id) {
          toast.error("Please log in to place an order.");
          return;
        }
const orderId = Math.floor(Math.random() * 100000);
        const id = Id;
        const Data = {
          token: 'tok_visa',
          delivery_address: {
           fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            city: data.city,
            address: data.address,
            PickupDate : data.PickupDate,
            ReturnDate : data.ReturnDate,
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
          const orders = collection(db, "Rent_orders");
          await addDoc(orders, {
            userId: id,
            token: token?.id,
            delivery_address: Data.delivery_address,
            carDetails: Data.carDetails,
            timestamp: new Date(),
          });

         

          setTimeout(() => {
            toast.success(t("Order placed successfully!"), { autoClose: 2000 });
          },2000)

          setTimeout(() => {
            navigate("/complete", { state: { orderId } });
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
  
        <div className='mx-4'>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400 }}>

          <div className="text-center rounded-lg shadow-2xl bg-gradient-to-r from-gray-50 to-transparent">

<div className="bg-transparent p-8 text-center rounded-lg shadow-xl border-2">
  <Typography variant="h5" gutterBottom>
    {t('Payment Details')}
  </Typography>
  <Grid item xs={8}>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3'>
      <TextField
        name="fullName"
        label={t('Full Name')}
        fullWidth
        margin="normal"
        variant='standard'
        {...register('fullName', { required: t('Full Name is required') })}
        error={!!errors.fullName}
        helperText={errors.fullName ? errors.fullName.message : ''}
      />

      <TextField
        name="email"
        label={t('Email')}
        fullWidth
        variant="standard"
        margin="normal"
        {...register('email', { required: t('Email is required') })}
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ''}
      />

      <TextField
        name="phone"
        label={t('Phone')}
        fullWidth
        margin="normal"
        variant='standard'
        {...register('phone', { required: t('Phone is required') })}
        error={!!errors.phone}
        helperText={errors.phone ? errors.phone.message : ''}
      />

      <TextField
        name="city"
        label={t('City')}
        fullWidth
        variant="standard"
        margin="normal"
        {...register('city', { required: t('City is required') })}
        error={!!errors.city}
        helperText={errors.city ? errors.city.message : ''}
      />

<FormControl fullWidth margin="normal" variant='standard'>
                  <InputLabel id="demo-simple-select-label">{t('Partial Payment')}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="PartialPayment"
                    label="Payment Type"
                    style={{ textAlign: "left" }}
                    defaultValue={"20"}
                  >
                    <MenuItem value="20">20</MenuItem>
                    <MenuItem value="30">30</MenuItem>
                    <MenuItem value="40">40</MenuItem>

                  </Select>
                </FormControl>

      <TextField
        name="address"
        label={t('Address')}
        fullWidth
        variant="standard"
        margin="normal"
        {...register('address', { required: t('Address is required') })}
        error={!!errors.address}
        helperText={errors.address ? errors.address.message : ''}
      />  

  


      <TextField
        name="PickupDate"
        label={t('Pickup Date')}
        type="date"
        fullWidth
        margin="normal"
        variant='standard'
        {...register('PickupDate', { required: t('Pickup Date is required') })}
        error={!!errors.PickupDate}
        helperText={errors.PickupDate ? errors.PickupDate.message : ''}
        inputProps={{
          min: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 👈 يمنع الأيام اللي قبل النهاردة
        }}
        
      />

      <TextField
        name="ReturnDate"
        label={t('Return Date')}
        type="date"
        fullWidth
        variant="standard"
        margin="normal"
        {...register('ReturnDate', { required: t('Return Date is required') })}
        error={!!errors.ReturnDate}
        helperText={errors.ReturnDate ? errors.ReturnDate.message : ''}
        inputProps={{
          min: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 👈 يمنع الأيام اللي قبل النهاردة
        }}
      />

    
    </div>
  </Grid>
</div>




<div className="bg-transparent p-2 m-4 text-center rounded-lg shadow-xl">
              <Typography variant="h5" gutterBottom sx={{ letterSpacing: 4 , color: "black" }}>
                {t('Payment Method')}
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12}>
                  <Box sx={{ border: '1px solid #ccc', borderRadius: 1, padding: 2 }}>
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
              sx={{ m: 2, width: 300 }}
              disabled={!stripe}
            >
             {loading ? <Wait />: t('Pay Now')}
            </Button>

</div>

   
          </Box>
        </div>
    
    </>
  );
}

export default Payment;

