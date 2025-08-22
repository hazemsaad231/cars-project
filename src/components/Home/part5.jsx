import { Brands } from "./data";
import React, { memo } from "react";
import { useTranslation } from 'react-i18next';

const Brand = () => {
  const { t } = useTranslation();
  return (
    <div data-aos="fade-up" className="my-24">
      <h1 className="font-bold text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl mb-16 mt-8 text-blue-700 tracking-[5px]">
        {t('popular Brands')}
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
  <div>
    <Icon
      className="text-blue-700 m-auto text-7xl sm:text-7xl md:text-8xl lg:text-8xl  transition-transform duration-300 hover:scale-110"
      style={{ willChange: "transform" }}
    />
  </div>
));

export default memo(Brand);
