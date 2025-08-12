import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { IoCarSport } from "react-icons/io5";
import { signInWithEmailAndPassword , signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { auth } from "../firebase/firebase";
import { FaGoogle } from "react-icons/fa6";
import { toast, ToastContainer } from 'react-toastify';
import { Tooltip } from '@mui/material';
import Aos from "aos";
import "aos/dist/aos.css";
import { useTranslation } from 'react-i18next';



const Login = ()=>{
 
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { t } = useTranslation();

   let navigate = useNavigate();
   const isLoginIn = true

   useEffect(() => {
      Aos.init({ duration: 1500, once: true });
    }, []);
 

  {/* ارسال البيانات */}
   const onSubmit = async (data) => {
     try {
       const response = await signInWithEmailAndPassword(auth, data.email, data.password);
       if(isLoginIn){
        localStorage.setItem('token',response._tokenResponse.idToken);
        setTimeout(() => {
          navigate("/home", {state:{message:t("Login successfully!")} });
        }, 1000);
       }
       console.log(response._tokenResponse.idToken)
       localStorage.setItem('token',response._tokenResponse.idToken);
       localStorage.setItem('role',response.user.email);
       localStorage.setItem('Id',response.user.uid);
       localStorage.setItem('user',response);
       console.log(response.user.uid);
     } catch (error) {
       console.error("Error:", error.message);
         toast.error(t('Email or password is incorrect') , {autoClose: 2000}, );
          setToastShown(true);
     } finally {
      console.log("Login attempt completed.");
     }
   };


   const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      // تسجيل الدخول باستخدام حساب جوجل
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Logged in via Google: ", user);

    } catch (error) {
      console.error("Error logging in via Google:", error);
    }
  };






  return (
    <>
    <ToastContainer limit={1}/>
      <div className=' flex flex-col justify-center items-center my-8 text-blue-700' data-aos="fade-left">
 <div className='w-[100%] sm:w-[100%] md:w-max lg:w-max xl:w-max px-8 sm:px-8 md:px-12 lg:px-16 xl:px-16 py-10 rounded-3xl shadow-2xl bg-white'>
          <div className="flex flex-col z-20 relative text-white">
            <IoCarSport className="w-20 h-20 m-auto " />  
          

          <h3 className="text-lg text-center">{t('Welcome back!')}</h3>
          <h1 className="font-bold text-2xl mb-4">{t('Login to your account')}</h1>
</div>
        <form onSubmit={handleSubmit(onSubmit)}>
           
<div class="absolute inset-0 pointer-events-none">
  <svg width="100%" height="100%" viewBox="12 4 4 150" preserveAspectRatio="none" className="rounded-xl">
    <circle cx="50" cy="20" r="50" fill="blue" />
  </svg>
</div>



            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: 'fit-content', margin: 'auto'},
              }}
              noValidate
              autoComplete="off"
            >
              <div className='flex flex-col gap-3'> 

                <Tooltip title={errors.email?.message} open={!!errors.email} arrow>
                <TextField
                  id="outlined-basic"
                  label={t('Email')}
                  variant="outlined"
                  {...register("email", {
                    required: t('Email is required'),
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: t('Please enter a valid email')
                    }
                  })}
                  error={errors.email}
                  className='bg-transparent shadow-2xl'
                />
             </Tooltip>

             <Tooltip title={errors.password?.message} open={!!errors.password} arrow>
                  <TextField
                    id="outlined-basic"
                    label={t('Password')}
                    type="password"
                    variant="outlined"
                    {...register("password", {
                      required: t('Password is required'),
                    })}
                    className='bg-transparent shadow-2xl'
                    error={errors.password}
                  />
                  </Tooltip>
              </div>
            </Box>

            <div className='flex flex-col gap-2'>
              <button
                type="submit"
                className='bg-blue-700 border text-white p-2 rounded-lg mt-4 '
              >
                {t('Login')}
              </button>
              <button
                className='border border-blue-700 p-2 rounded-lg mt-4 text-blue-700'
                onClick={() => navigate("register")}
              >
                {t('Register')}
              </button>
            </div>

            <div>
            <button onClick={handleGoogleLogin} className='border bg-blue-700 w-full p-3  px-16 rounded-lg mt-4 text-white text-center flex'><span className='m-auto'><FaGoogle size={25}></FaGoogle></span></button>
            </div>
          </form>
        </div>

      </div>
      </>
  );
}

export default Login;










 








