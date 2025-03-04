import { Link } from 'react-router-dom';
import logo from '../../../src/assets/img/RENT_MUSICAL_BLUE-logo-4631FB248C-seeklogo.com.png';
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useContext, useState, useEffect } from 'react';
import { Context } from '../context/Context';
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {

  
    // استرجاع بيانات المستخدم من localStorage
    const admin = localStorage.getItem('role');
    const id = localStorage.getItem('Id');
    const isLoggedIn = localStorage.getItem("token") !== null;


    // استرجاع القيم من سياق (context)
    const { isDarkMode, toggleMode, orderList } = useContext(Context);
    
    // حالة للتحكم في ظهور القائمة الجانبية
    const [isNavbarVisible, setNavbarVisible] = useState(false);
    // حالة لتحديث عدد الطلبات
    const [orderCount, setOrderCount] = useState(orderList.length);
    
    // البريد الإلكتروني للمشرف
    const Admin = 'hazemsaad231@gmail.com';

    // تحديث عدد الطلبات عند تغير orderList
    useEffect(() => {
        setOrderCount(orderList.length);
    }, [orderList]);

    // تبديل إظهار القائمة الجانبية
    const toggleNavbar = () => {
        setNavbarVisible(!isNavbarVisible);
    };

    return (
        <div className="flex flex-row justify-between w-full px-10" style={{ fontFamily: "arial" }}>
            {/* شعار الموقع ووضعية الوضع المظلم */}
            <div className='flex flex-row mr-20 mt-5 gap-4'>
                <img src={logo} alt="logo" className='w-10 h-10' id='logo'/> 
                <h2 className='text-md sm:text-lg md:text-lg lg:text-lg xl:text-lg text-blue-600 font-extrabold mt-1 hover:text-blue-800'>RENTCARS</h2>
                <GiHamburgerMenu className="text-3xl absolute right-4 text-blue-700 cursor-pointer block sm:hidden" onClick={toggleNavbar} />
                {isDarkMode ? <MdOutlineLightMode className='text-2xl mt-1 cursor-pointer' onClick={toggleMode} /> : <MdOutlineDarkMode className='text-2xl mt-1 cursor-pointer' onClick={toggleMode} />}
            </div>

            {/* قائمة الروابط في الشاشات الصغيرة */}
            {isNavbarVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-100 flex flex-col items-center justify-center gap-20 z-50">
                    <ul className="text-center flex flex-col gap-20 font-bold text-2xl text-blue-700">
                        <li><Link to="home" onClick={toggleNavbar}>Home</Link></li>
                        <li><Link to="allcars" onClick={toggleNavbar}>Book a Car</Link></li>
                        <li><Link to="offers" onClick={toggleNavbar}>Rent a Car</Link></li>
                        {admin && admin.trim() === Admin.trim() && isLoggedIn ? (
                            <li><Link to="booking" onClick={toggleNavbar}>Manage Cars</Link></li>
                        ) : (
                            <>
                                {isLoggedIn && <li><Link to={`rese/${id}`} onClick={toggleNavbar}>My reservations</Link></li>}
                                <li><a href='#contact' onClick={toggleNavbar}>Contact Us</a></li>
                            </>
                        )}
                        <li><Link to="login" onClick={toggleNavbar}>Sign in</Link></li>
                    </ul>
                    {/* زر الإغلاق */}
                    <button onClick={toggleNavbar} className="text-red-500 font-bold text-xl absolute top-4 right-4">✖</button>
                </div>
            )}

            {/* قائمة الروابط في الشاشات الكبيرة */}
            <div className='hidden sm:block'>
                <ul className="flex gap-3 justify-center m-6 cursor-pointer font-bold text-lg text-blue-700">
                    <li><Link to="home" className='border-b-2 border-l-2 px-2 rounded-xl hover:border-blue-800 border-transparent transition duration-300'>Home</Link></li>
                    <li><Link to="allcars" className='border-b-2 border-l-2 px-2 rounded-xl hover:border-blue-800 border-transparent transition duration-300'>Book a Car</Link></li>
                    <li><Link to="offers" className='border-b-2 border-l-2 px-2 rounded-xl hover:border-blue-800 border-transparent transition duration-300'>Rent a Car</Link></li>
                    {admin && admin.trim() === Admin.trim() && isLoggedIn ? (
                        <li><Link to="booking" className='border-b-2 border-l-2 rounded-xl hover:border-blue-800 px-2 border-transparent transition duration-300'>Manage Cars</Link></li>
                    ) : (
                        <>
                            {isLoggedIn && <li><Link to={`rese/${id}`} className='border-b-2 border-l-2 px-2 rounded-xl hover:border-blue-800 border-transparent transition duration-300'>My reservations</Link></li>}
                            <li><a href='#contact' className='border-b-2 border-l-2 rounded-xl hover:border-blue-800 px-2 border-transparent transition duration-300'>Contact Us</a></li>
                        </>
                    )}
                    <li><button className='border-b-2 border-l-2 px-2 rounded-xl border-blue-800'><Link to="login">Sign in</Link></button></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
