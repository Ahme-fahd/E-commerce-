import React from 'react';
import firstImg from '../../assets/firstImg.jpeg';
import secondImg from '../../assets/secondImg.jpeg';
import thirdImg from '../../assets/thirdImg.jpeg';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 10000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {/* Hero Section */}
<div className="relative w-full overflow-hidden">
  <Slider {...settings} className="w-full h-full">
    {/* Slide 1 */}
    <div className="relative w-full h-screen sm:h-3/4 lg:h-4/5">
      <img
        src={firstImg}
        className="w-full h-full object-cover"
        alt="Featured product 1"
      />
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="text-center bg-black bg-opacity-60 p-4 sm:p-6 lg:p-8 rounded-lg shadow-2xl max-w-lg sm:max-w-xl lg:max-w-2xl">
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-white mb-2 sm:mb-4 lg:mb-6 transition-transform duration-300 ease-in-out transform hover:scale-105">
            Discover Our Latest Collection
          </h1>
          <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-white mb-2 sm:mb-4 lg:mb-6 max-w-xs sm:max-w-md lg:max-w-lg mx-auto transition-opacity duration-300 ease-in-out opacity-80 hover:opacity-100">
            Explore the trendiest items of the season with exclusive styles and limited editions.
          </p>
          <Link
            to="/products"
            className="bg-gray-800 text-white py-2 sm:py-3 px-4 sm:px-6 lg:py-3 lg:px-8 rounded-full text-xs sm:text-sm lg:text-base xl:text-lg font-semibold shadow-md hover:bg-gray-700 transition-colors duration-300 transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>

    {/* Slide 2 */}
    <div className="relative w-full h-screen sm:h-3/4 lg:h-4/5">
      <img
        src={secondImg}
        className="w-full h-full object-cover"
        alt="Featured product 2"
      />
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="text-center bg-black bg-opacity-60 p-4 sm:p-6 lg:p-8 rounded-lg shadow-2xl max-w-lg sm:max-w-xl lg:max-w-2xl">
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-white mb-2 sm:mb-4 lg:mb-6 transition-transform duration-300 ease-in-out transform hover:scale-105">
            Exclusive Offers Just for You
          </h1>
          <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-white mb-2 sm:mb-4 lg:mb-6 max-w-xs sm:max-w-md lg:max-w-lg mx-auto transition-opacity duration-300 ease-in-out opacity-80 hover:opacity-100">
            Don't miss out on our special discounts and limited-time offers.
          </p>
          <Link
            to="/offers"
            className="bg-gray-800 text-white py-2 sm:py-3 px-4 sm:px-6 lg:py-3 lg:px-8 rounded-full text-xs sm:text-sm lg:text-base xl:text-lg font-semibold shadow-md hover:bg-gray-700 transition-colors duration-300 transform hover:scale-105"
          >
            View Offers
          </Link>
        </div>
      </div>
    </div>

    {/* Slide 3 */}
    <div className="relative w-full h-screen sm:h-3/4 lg:h-4/5">
      <img
        src={thirdImg}
        className="w-full h-full object-cover"
        alt="Featured product 3"
      />
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="text-center bg-black bg-opacity-60 p-4 sm:p-6 lg:p-8 rounded-lg shadow-2xl max-w-lg sm:max-w-xl lg:max-w-2xl">
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-white mb-2 sm:mb-4 lg:mb-6 transition-transform duration-300 ease-in-out transform hover:scale-105">
            New Arrivals Are Here
          </h1>
          <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-white mb-2 sm:mb-4 lg:mb-6 max-w-xs sm:max-w-md lg:max-w-lg mx-auto transition-opacity duration-300 ease-in-out opacity-80 hover:opacity-100">
            Be the first to get your hands on the latest trends and hottest styles.
          </p>
          <Link
            to="/new-arrivals"
            className="bg-gray-800 text-white py-2 sm:py-3 px-4 sm:px-6 lg:py-3 lg:px-8 rounded-full text-xs sm:text-sm lg:text-base xl:text-lg font-semibold shadow-md hover:bg-gray-700 transition-colors duration-300 transform hover:scale-105"
          >
            See New Arrivals
          </Link>
        </div>
      </div>
    </div>
  </Slider>
</div>

    </>
  );
}
