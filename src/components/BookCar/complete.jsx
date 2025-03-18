import { GrCompliance } from "react-icons/gr";
import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

const Complete = () => {

  const { isDarkMode } = useContext(Context)

 


  return (

    <div className={`flex flex-col items-center justify-center gap-5`}>
    <div className={`shadow-2xl mx-6 m-auto mt-20 p-16 ${isDarkMode ?'border border-gray-600' : 'border-gray-200'}`}>
      <div className="success-message">
        <h1 className="text-xl font-semibold mb-4">Your Reservation is Successful!</h1>
        <GrCompliance color="green" size={100} className="m-auto my-6"/>
        <div><strong>Reservation Number : </strong>{Math.floor(Math.random() * 100000)}</div>
        <p className="text-gray-500 text-sm sm:text-sm md:text-md lg:text-md">Thank you for your reservation.</p>
      </div>
      <button className="back-button"> <Link to="/home">Back to Home Page</Link></button>
    </div>
    </div>
  );
};

export default Complete


