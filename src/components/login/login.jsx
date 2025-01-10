import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { IoCarSport } from "react-icons/io5";
import { signInWithEmailAndPassword , signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { auth } from "../firebase/firebase";
import { FaGoogle } from "react-icons/fa6";
import { toast, ToastContainer } from 'react-toastify';

const Login = ()=>{
 

  let navigate = useNavigate();

const isLoginIn = true

  const { register, handleSubmit, formState: { errors } } = useForm();
  
 
   const onSubmit = async (data) => {
     try {
       const response = await signInWithEmailAndPassword(auth, data.email, data.password);
       if(isLoginIn){
        localStorage.setItem('token',response._tokenResponse.idToken);
        setTimeout(() => {
          navigate("/home", {state:{message:"Login successful"} });
        }, 1000);
       }
        
       console.log(response._tokenResponse.idToken);

       localStorage.setItem('role',response.user.email);
       localStorage.setItem('Id',response.user.uid);
       localStorage.setItem('user',response);
       console.log(response.user.uid);
     } catch (error) {
       console.error("Error:", error);
       toast.error(error.response?.data?.message || "Failed to login. Please try again.", {autoClose: 2000});
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

      // هنا يمكنك إرسال المستخدم إلى الصفحة الرئيسية أو الصفحة المطلوبة بعد تسجيل الدخول
    } catch (error) {
      setLoginError("Google login error: " + error.message);
    }
  };






  return (
    <>
    <ToastContainer/>
      <div className=' flex flex-col justify-center items-center my-8'>
 <div className='w-[100%] sm:w-[100%] md:w-max lg:w-max xl:w-max border px-8 sm:px-8 md:px-12 lg:px-16 xl:px-16 py-10 rounded-lg shadow-2xl bg-gradient-to-t from-blue-50 to-transparent'>
          <div className="p-6">
            <IoCarSport className="w-20 h-20 m-auto text-black" />  
          </div>

          <h3 className="text-black text-lg text-start">Welcome back!</h3>
          <h1 className="font-bold text-black text-2xl mb-4">Login to your account</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
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
                  className='bg-transparent shadow-2xl'
                />
                {errors.email && <span className='text-red-400 text-start text-sm'>Email is required</span>}

                <div className='mt-4'>
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    type="password"
                    variant="outlined"
                    {...register("password", {
                      required: 'Password is required',
                    })}
                    className='bg-transparent shadow-2xl'
                  />
                  {errors.password && <span className='text-red-400 text-start text-sm'>Password is required</span>}
                </div>
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
                onClick={() => navigate("/register")}
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










 








