import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'

export default function ImgSlider({ imgs , answer , showArrows}) {
    var settings = {
        dots: answer,
        infinite: answer,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: showArrows,
      };
  return (
    <>
      <Slider {...settings}>
        {imgs?.map((img, index)  => {
          console.log(img);
          
          return (
            <img  key ={index}
              className="w-full rounded-md object-contain max-w-lg mx-auto"
              src={img}
            />
          );
        })}
      </Slider>
    </>
  );
}
