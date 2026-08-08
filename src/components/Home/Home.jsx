import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Hero from "./Hero";
import PopularCars from "./PopularCars";
import OfferCountdown from "./OfferCountdown";
import WeeklyDeals from "./WeeklyDeals";
import Brands from "./Brands";
import WhyChooseUs from "./WhyChooseUs";
import Testimonials from "./Testimonials";
import AppDownload from "./AppDownload";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Flash message handed over by another route (e.g. after signing in).
  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, location.pathname, navigate]);

  return (
    <>
      <Hero />
      <PopularCars />
      <OfferCountdown />
      <WeeklyDeals />
      <Brands />
      <WhyChooseUs />
      <Testimonials />
      <AppDownload />
    </>
  );
};

export default Home;
