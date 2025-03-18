import { Outlet } from "react-router-dom"
import Image from "./image"


const Auth = () => {


    return (
       
            <div className="relative h-screen">

             <div className="absolute w-full">
              <Image/>
            </div>

  
              <div className="absolute  flex flex-col justify-center items-center w-full h-full">
                  <Outlet/>  
                  </div>


               </div>





       
    )
}

export default Auth
