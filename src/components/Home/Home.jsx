import One from './part1';
import Two from './part2';
import Three from './part3'
import Four from './part4'
import Five from './part5';
import Sex from './part6';
import Offer from './part7';
import Brand from './part8';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
const Home = ()=>{

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.message) {
            toast.success(location.state.message, { autoClose: 2000 }); // عرض الرسالة
            // تفريغ الحالة بعد عرض التوست
            navigate(location.pathname, { replace: true }); 
        }
    }, [location.state, navigate]);

    return(

<>
<ToastContainer/>
<div>

<One/>
     
     <Two/>
 
     <Offer/>
          
     <Three/>
 
     <Brand/>
   
     <Four/>
 
     <Five/>
 
     <Sex/>


</div>
       
   
    
       
        
 </>



    )
}



export default Home;

