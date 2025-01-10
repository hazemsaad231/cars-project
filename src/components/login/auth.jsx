import { Outlet } from "react-router-dom"
import Image from "./image"


const Auth = () => {
    return (
       
         
           

            <div class="relative h-screen">

             <div class="absolute w-full">
              <Image/>
            </div>

  
              <div class="absolute  flex flex-col justify-center items-center w-full h-full">
                  <Outlet/>  
                  </div>


               </div>





       
    )
}

export default Auth
