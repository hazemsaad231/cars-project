// import One from './part1';
// import Two from './part2';
// import Four from './part4'
// import Six from './part6'
// import Seven from './part7';
// import Eight from './part8';
// import Brand from './part5';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Aos from "aos";
import "aos/dist/aos.css";
import React, { Suspense } from "react";

const One = React.lazy(() => import("./part1"));
const Two = React.lazy(() => import("./part2"));
const Offer = React.lazy(() => import("./part3"));
const Four = React.lazy(() => import("./part4"));
const Brand = React.lazy(() => import("./part5"));
const Six = React.lazy(() => import("./part6"));
const Seven = React.lazy(() => import("./part7"));
const Eight = React.lazy(() => import("./part8"));






const Home = ()=>{

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        Aos.init({ duration: 1000, once: true });

        const handleScroll = () => {
            Aos.refresh();
          };
      
          window.addEventListener("scroll", handleScroll);
          return () => window.removeEventListener("scroll", handleScroll);

      }, []);

      
    useEffect(() => {
        if (location.state?.message) {
            toast.success(location.state.message, { autoClose: 2000 }); // عرض الرسالة
            navigate(location.pathname, { replace: true }); 
        }
    }, [location.state, navigate]);

    return(

<>
<ToastContainer/>
<div style={{ fontFamily: "Arial" }}>
<Suspense fallback = ''>
<One/>
<Two/>
<Offer/>
<Four/>
<Brand/>
<Six/>
<Seven/>
<Eight/>
</Suspense>
</div>

       
   
    
       
        
 </>



    )
}



export default Home;

