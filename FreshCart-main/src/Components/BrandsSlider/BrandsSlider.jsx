import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

export default function BrandsSlider() {
    const [brands, setBrands] = useState(null);

    useEffect(() => {
        getbrands();
    }, []);

    async function getbrands() {
        try {
            const { data } = await axios('https://ecommerce.routemisr.com/api/v1/brands');
            setBrands(data.data);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    }

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 1000,
        cssEase: 'linear',
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    };

    return (
      <div className="slider-container py-10">
        <Slider {...settings}>
          {brands?.map((brand, index) => (
            <div
              key={index}
              className="flex mt-5 py-5 bg-gray-900 dark:bg-transparent items-center w-full"
            >
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto p-4">
                <figure className="relative">
                  <img
                    className="w-full h-48 md:h-60 object-contain rounded-lg shadow-lg"
                    src={brand.image}
                    alt={brand.name}
                  />
                </figure>
                <figcaption className="mt-2">
                  <p className="text-center text-base sm:text-lg font-medium dark:text-white text-gray-200 truncate">
                    {brand.name}
                  </p>
                </figcaption>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
}
