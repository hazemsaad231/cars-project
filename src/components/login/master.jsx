import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/navbar'
import Footer from '../footer/footer'
import color from '../../assets/img/color.png'
const Master = () => {


    return (
        <div className='text-center' style={{ backgroundImage: `url(${color})` }}>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Master



