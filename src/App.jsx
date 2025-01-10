import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home'
import Master from './components/login/master'
import Details from './components/cars/carDetails'
import AllCars from './components/cars/allCars'
import AddCar from './components/addcar/addCar'
import AddRent from './components/addcar/addRentCar'
import Auth from './components/login/auth'
import Login from './components/login/login'
import Register from './components/login/register'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import BuyDetails from './components/BookCar/buyDetails'  
import Complete from './components/BookCar/complete'
import RentCar from './components/RentCar/offer'
import RentDetails from './components/RentCar/rentDetails'
import Bookings from './components/orders/bookings'
import Footer from './components/footer/footer'
import PrivateRoute from './components/login/protected'
import Reservations from './components/myReservations/reservations'
function App() {
 


  const Stripe = loadStripe("pk_test_51QFwLTBBBCgBrYZETIOQg6jU8b6FNOuHyjGPeIWliPqSeYXqTbJkV8QYxeNHqUMCyzf5m4meV3J3HX1m7mMEEWVj00Hz8287JJ")



  let route = createBrowserRouter([

{
  path: "/",
  element: <Auth />,
  errorElement: <div>Error</div>,
  children: [
    {index: true, element: <Login />},
    {path: "login", element: <Login />},
    {path: "register", element: <Register/>},
  ]
},


{
  path: "/home",
  element: <PrivateRoute> <Master /> </PrivateRoute>,
  errorElement: <div>Error</div>,
  children: [
    {index: true, element: <Home />},
    {path: "home", element: <Home />},
    {path: "allcars", element: <AllCars/>},
    {path: "details/:id", element: <Details />},
    {path: "addCar", element: <AddCar/>},
    {path: "addRent", element: <AddRent/>},
    {path: "addCar/:id", element: <AddCar/>},
    {path: "addRent/:id", element: <AddRent/>},
    {path: "contact", element: <Footer/>},
    {path: "buy/:id", element: <BuyDetails/>},
    {path: "complete", element: <Complete/>},
    {path: "offers", element: <RentCar/>},
    {path: "rent/:id", element: <RentDetails/>},
    {path: "booking", element:<Bookings/>},
    {path: "rese/:id", element:<Reservations/>},



]}

]);

  return (
    <>
    <div>
      <Elements stripe={Stripe}>
    <RouterProvider router={route} />
    </Elements>
    </div>
    
    </>
  )
}

export default App
