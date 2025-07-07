import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/navbar'
import Footer from '../footer/footer'
const Master = () => {


    return (
        <div className='text-center'>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Master



