import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
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

const Login = ()=>{
 
  const { register, handleSubmit, formState: { errors } } = useForm();

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
          navigate("/home", {state:{message:"Login successful"} });
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
       toast.error(error.message , {autoClose: 2000});
     } finally {
      
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
      setLoginError("Google login error: " + error.message);
    }
  };






  return (
    <>
    <ToastContainer/>
      <div className=' flex flex-col justify-center items-center my-8' data-aos="fade-down">
 <div className='w-[100%] sm:w-[100%] md:w-max lg:w-max xl:w-max border px-8 sm:px-8 md:px-12 lg:px-16 xl:px-16 py-10 rounded-lg shadow-2xl bg-gradient-to-t from-blue-50 to-transparent'>
          <div className="pb-4">
            <IoCarSport className="w-20 h-20 m-auto text-black" />  
          </div>

          <h3 className="text-black text-lg text-start">Welcome back!</h3>
          <h1 className="font-bold text-black text-2xl mb-4">Login to your account</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
           
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
                  label="Email"
                  variant="outlined"
                  {...register("email", {
                    required: 'Email is required',
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: 'Please enter a valid email'
                    }
                  })}
                  error={errors.email}
                  className='bg-transparent shadow-2xl'
                />
             </Tooltip>

             <Tooltip title={errors.password?.message} open={!!errors.password} arrow>
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    type="password"
                    variant="outlined"
                    {...register("password", {
                      required: 'Password is required',
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
                className='bg-black border text-white p-2 rounded-lg mt-4 '
              >
                Login
              </button>
              <button
                className='border border-black p-2 rounded-lg mt-4 text-black'
                onClick={() => navigate("register")}
              >
                Register
              </button>
            </div>

            <div>
            <button onClick={handleGoogleLogin} className='border bg-black  w-full p-3  px-16 rounded-lg mt-4 text-white text-center flex'><span className='m-auto'><FaGoogle size={25}></FaGoogle></span></button>
            </div>
          </form>
        </div>

      </div>
      </>
  );
}

export default Login;










 








