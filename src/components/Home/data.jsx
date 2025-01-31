import boy from '../../assets/img/boy.jpg'
import boy2 from '../../assets/img/boy2.jpg'
import boy3 from '../../assets/img/boy3.jpg'
import boy4 from '../../assets/img/boy4.jpg'
import star from '../../../src/assets/img/star.png'
import bmw from '../../../src/assets/img/Bmw.jpg'
import audi from '../../../src/assets/img/audi.jpg'
import mercedes from '../../../src/assets/img/Mercedes.jpg'






const Names = [
    
    {
        id: 0,
        name: "Hazem Mahisin",
        discription: "A versatile SUV that combines comfort with rugged capability! Great for road trips, off-road adventures, and family outings, with premium .",
        date: "Last updated 10 mins ago",
        image:boy4,
        num:5,
        star:[star,star,star,star,star]
    },
    
    
    {   id: 1,
        name: "Ahmed Sherif",
        discription: "An exhilarating driving experience! Outstanding performance, sleek design, and quick acceleration make this car a true thrill to drive.",
        date: "Last updated 3 mins ago", 
        image:boy,
        num:4,
        star:[star,star,star,star]
    },
    {
        id: 2,
        name: "Diaa Helmy",
        discription: "The perfect choice for families! Spacious interior, comfortable seating, and advanced safety features make it ideal for long trips with loved ones.",
        date: "Last updated 6 mins ago",
        image:boy2,
        num:5,
        star:[star,star,star,star,star]
    },
    {
        id: 3,
        name: "Ahmed Mohraum",
        discription: "The experience was great, but I wish there were more options for luxury cars. The overall service is excellent!",
        date: "Last updated 20 mins ago",
        image:boy3,
        num:4,
        star:[star,star,star,star]
    },


    

   
];


export const Rent = [
    {
        id: 1,
        img:bmw,
        title:'Bmw Xm ',
        text:'The BMW XM is one of the latest and most respected SUVs in the world. It is a high-performance SUV, known for combining sporty driving experience with advanced technology.',
        price:'100',
        newPrice:'70',
    },
    {
        id: 2,
        img:mercedes,
        title:'Mercedes Benz',
        text:'Mercedes-Benz is renowned for its luxury, performance, and innovation, offering a diverse range of vehicles to suit various preferences and needs.',
        price:'100',
        newPrice:'60',
    },
    {
        id: 3,
        img:audi,
        title:'Audi R8',
        text:'The Audi R8 is a luxury mid-engine sports car first introduced in 2006. Renowned for its sleek design and exceptional performance, it has become an icon in the world of sports cars.',
        price:'200 ',
        newPrice:'120 ',
    }


]



export default Names


