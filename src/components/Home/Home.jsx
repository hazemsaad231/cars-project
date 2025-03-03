import One from './part1';
import Two from './part2';
import Four from './part4'
import Six from './part6'
import Seven from './part7';
import Eight from './part8';
import Offer from './part3';
import Brand from './part5';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
const Home = ()=>{

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.message) {
            toast.success(location.state.message, { autoClose: 2000 }); // عرض الرسالة
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
<Four/>
<Brand/>
<Six/>
<Seven/>
<Eight/>
</div>
       
   
    
       
        
 </>



    )
}



export default Home;

