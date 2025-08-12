import { Outlet } from "react-router-dom"


const Auth = () => {


    return (
       
            <div className="relative h-screen">
              <div className="absolute  flex flex-col justify-center items-center w-full h-full">
                  <Outlet/>  

                  </div>


                </div>





       
    )
}

export default Auth
