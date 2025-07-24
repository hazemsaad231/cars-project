import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCarSport } from "react-icons/io5";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebase/firebase";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { Tooltip } from '@mui/material';
import Aos from "aos";
import "aos/dist/aos.css";
import { useTranslation } from 'react-i18next';

export default function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role: "admin",
    },
  });
 
 useEffect(() => {
      Aos.init({ duration: 1500, once: true });
    }, []);
  {/* خاص بconfirm password */}
  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log("User registered successfully:", response);

      const db = getFirestore();
      await setDoc(doc(db, "users", response.user.uid), {
        firstName: data.first_name,
        lastName: data.last_name,
        role: data.role,
        email: data.email,
      });



      toast("Register successfully");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(`Failed to register: ${error.message}`);
    }
  };


  
  return (
    <>
    <ToastContainer />
      <div className="flex flex-col justify-center" data-aos="fade-right">
      <div className='w-[100%] m-auto sm:w-[100%] md:w-max lg:w-max xl:w-max border pb-4 px-10 sm:px-10 md:px-10 lg:px-16 xl:px-16 rounded-lg shadow-2xl bg-gradient-to-t from-blue-50 to-transparent'>
          <div className="p-2">
            <IoCarSport className="w-20 h-20 m-auto text-black" />

            <h3 className="text-gray-800 text-lg text-center">
              {t('Create new account')}
            </h3>
            <h1 className="font-bold text-2xl mb-3 text-center">{t('Register')}</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                "& > :not(style)": { my : 1, width: "27ch"  },
              }}
              noValidate
              autoComplete="off"
              className="flex flex-col"
            >
              <div className="flex gap-5">

                <Tooltip title={errors.first_name?.message} open={!!errors.first_name} arrow>
                  <TextField
                    id="outlined-basic"
                    label={t('firstName')}
                    variant="outlined"
                    {...register("first_name", { required: 'First name is required' })}
                    error={!!errors.first_name}
                    className="bg-transparent shadow-xl"
                  />
               </Tooltip>
                

                <Tooltip title={errors.last_name?.message} open={!!errors.last_name} arrow>
                  <TextField
                    id="outlined-basic"
                    label={t('lastName')}
                    variant="outlined"
                    {...register("last_name", { required: 'Last name is required' })}
                    className="bg-transparent shadow-xl"
                    error={!!errors.last_name}
                  />
                 </Tooltip>

                </div>
            

        <Tooltip title={errors.email?.message} open={!!errors.email} arrow>
                <TextField
                  id="outlined-basic"
                  label={t('Email')}
                  variant="outlined"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Please enter a valid email",
                    },
                  })}
                  error={!!errors.email}
                  fullWidth

                  className="bg-transparent shadow-xl"
                />
               
              </Tooltip>

                <Tooltip title={errors.password?.message} open={!!errors.password} arrow>
                  <TextField
                    id="outlined-basic"
                    label={t('Password')}
                    type="password"
                    variant="outlined"
                    {...register("password", { required: "Password is required",
                    minLength: {
                      value: 7,
                      message: "Password must be at least 7 characters",
                    }
                     })}
                    error={!!errors.password}
                    className="bg-transparent shadow-xl"
                  />
              </Tooltip>


                <Tooltip title={errors.confirm_password?.message} open={!!errors.confirm_password} arrow>
                  <TextField
                    id="outlined-basic"
                    label={t('Confirm Password')}
                    type="password"
                    variant="outlined"
                    {...register("confirm_password", { required: "confirm password is required",
                      validate: (value) => value === password || "Passwords do not match",
                     })}
                    error={!!errors.confirm_password}
                    className="bg-transparent shadow-xl"
                  />
                
              </Tooltip>


              
            </Box>

            <div className="flex flex-col justify-center gap-2">
              <button
                type="submit"
                className="bg-black text-white p-2 rounded-lg mt-4"
              >
                {t('Register')}
              </button>
              <button
                className="border border-black p-2 rounded-lg mt-4 text-black"
                onClick={() => navigate("/login")}
              >
                {t('Login')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}










