import { Brands } from "./data";
import React, { memo } from "react";

const Brand = () => {
  return (
    <div data-aos="fade-up" className="my-20">
      <h1 className="font-bold text-2xl mb-16 mt-8 text-blue-700 tracking-[5px]" style={{ fontFamily: "arial" }}>
        Popular Brands
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-12 w-[90%] m-auto cursor-pointer">
        {Brands.map(({ item, icon: Icon }) => (
          <BrandItem key={item} Icon={Icon} />
        ))}
      </div>
    </div>
  );
};

const BrandItem = memo(({ Icon }) => (
  <div className="border border-gray-300 rounded-lg p-4 bg-transparent" id="btn">
    <Icon
      className="text-blue-700 m-auto text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl transition-transform duration-300 hover:scale-110"
      style={{ willChange: "transform" }}
    />
  </div>
));

export default memo(Brand);
