import {
  SiBmw,
  SiFord,
  SiHyundai,
  SiJeep,
  SiKia,
  SiMaserati,
  SiMercedes,
  SiToyota,
} from "react-icons/si";

import audi from "../../assets/img/audi.webp";
import bmw from "../../assets/img/Bmw.webp";
import mercedes from "../../assets/img/Mercedes.webp";

/** Hand-picked promo rates shown on the home page. */
export const weeklyDeals = [
  {
    id: 1,
    img: bmw,
    title: "BMW XM",
    text: "A high-performance SUV that pairs a sporty drive with the latest cabin technology. Ideal for long weekends.",
    price: 100,
    newPrice: 70,
  },
  {
    id: 2,
    img: mercedes,
    title: "Mercedes-Benz",
    text: "Renowned for luxury, comfort and innovation — the easy choice for business trips and airport runs.",
    price: 100,
    newPrice: 60,
  },
  {
    id: 3,
    img: audi,
    title: "Audi R8",
    text: "A mid-engine sports car with sleek styling and exceptional performance. Rent it for the day and enjoy.",
    price: 200,
    newPrice: 120,
  },
];

export const brands = [
  { id: 1, icon: SiToyota, title: "Toyota" },
  { id: 2, icon: SiFord, title: "Ford" },
  { id: 3, icon: SiJeep, title: "Jeep" },
  { id: 4, icon: SiHyundai, title: "Hyundai" },
  { id: 5, icon: SiKia, title: "Kia" },
  { id: 6, icon: SiMercedes, title: "Mercedes" },
  { id: 7, icon: SiBmw, title: "BMW" },
  { id: 8, icon: SiMaserati, title: "Maserati" },
];

export const testimonials = [
  {
    id: 0,
    name: "Hazem Mahisin",
    role: "Rented a Jeep Cherokee",
    quote:
      "A versatile SUV that combines comfort with rugged capability. Great for road trips and family outings — pickup took five minutes.",
    image:
      "https://res.cloudinary.com/dpqfbrbxj/image/upload/v1756457740/boy3_ez8kl9.webp",
    stars: 5,
  },
  {
    id: 1,
    name: "Ahmed Sherif",
    role: "Rented an Audi R8",
    quote:
      "An exhilarating driving experience. Outstanding performance, sleek design and quick acceleration — worth every pound.",
    image:
      "https://res.cloudinary.com/dpqfbrbxj/image/upload/v1756457701/boy_fxbrdw.webp",
    stars: 4,
  },
  {
    id: 2,
    name: "Diaa Helmy",
    role: "Rented a Tesla Model Y",
    quote:
      "The perfect choice for families. Spacious interior, comfortable seating and advanced safety features for long trips.",
    image:
      "https://res.cloudinary.com/dpqfbrbxj/image/upload/v1756457752/boy4_mzwnum.webp",
    stars: 5,
  },
  {
    id: 3,
    name: "Ahmed Mohraum",
    role: "Rented a BMW Sedan",
    quote:
      "The experience was great, though I wish there were more luxury options. The overall service is excellent.",
    image:
      "https://res.cloudinary.com/dpqfbrbxj/image/upload/v1756457721/boy2_sblnpr.webp",
    stars: 4,
  },
];
