import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

export default function HomeSlider() {
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        getCategories();
    }, []);

    async function getCategories() {
        try {
            const { data } = await axios('https://ecommerce.routemisr.com/api/v1/categories');
            setCategories(data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }
    function SampleNextArrow(props) {
      const { onClick } = props;
      return (
          <div 
              style={{
                  position: "absolute",
                  top: "0",
                  right: "0px",
                  background: "gray",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  color: "white",
                  zIndex: 2,
              }}
              onClick={onClick}
          >
              ➔ {/* You can use a different icon or character here */}
          </div>
      );
  }
  
  function SamplePrevArrow(props) {
      const { onClick } = props;
      return (
          <div
              style={{
                position: "absolute",
                top: "0px",
                right: "60px",
                  background: "gray",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  color: "white",
                  zIndex: 2,
                  transform: "rotate(180deg)"
              }}
              onClick={onClick}
          >
              ➔ {/* You can use a different icon or character here */}
          </div>
      );
  }
  
    const settings = {
      dots: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2000,
      slidesToShow: 3, // Start with 1 for smallest screens
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 640, // Mobile screens
          settings: {
            slidesToShow: 1,
          }
        },
        {
          breakpoint: 768, // Tablets
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 1024, // Small desktops
          settings: {
            slidesToShow: 3,
          }
        }
      ]
    };

    return (
<div className="slider-container relative px-4 sm:px-6 md:px-8 overflow-auto">
    <Slider {...settings}>
        {categories?.map((categorie) => (
            <div
                key={categorie._id}
                className="flex justify-center mt-5 py-5 bg-gray-100 dark:bg-gray-800 items-center"
            >
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-4">
                    <figure className="relative">
                    <Link to={`/category/${categorie._id}`}>
                    <img
                            className="w-full h-40 sm:h-48 md:h-60 object-contain rounded-lg shadow-lg"
                            src={categorie.image}
                            alt={categorie.name}
                        />
                    </Link>
                    </figure>
                    <figcaption className="mt-2">
                        <p className="text-center text-sm sm:text-base md:text-lg font-medium dark:text-white text-gray-800 truncate">
                            {categorie.name}
                        </p>
                    </figcaption>
                </div>
            </div>
        ))}
    </Slider>
</div>

    );
}

