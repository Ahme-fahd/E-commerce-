import React from 'react'
import { Helmet } from 'react-helmet';
import img1 from '../../assets/photo-1.avif'
import img2 from '../../assets/photo-2.avif'
import img3 from '../../assets/photo-3.avif'

export default function About() {
  return (
    <>
    <Helmet>
        <title>About</title>
      </Helmet>
      <div className="py-16 bg-white dark:bg-slate-950">
        <div className="container m-auto px-6 text-gray-600 dark:text-white md:px-12 xl:px-6">
        <div>
      <p className="text-sm leading-4 text-gray-600 dark:text-white">Home</p>
    </div>
    <div className="mt-3">
      <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white mb-10">About</h1>
    </div>
          <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
            <div className="md:5/12 lg:w-5/12">
              <img
                src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png"
                alt="image"
                loading="lazy"
                width=""
                height=""
              />
            </div>
            <div className="md:w-7/12 lg:w-6/12">
              <h2 className="text-2xl text-gray-900 dark:text-white font-bold md:text-4xl">
                Our Story
              </h2>
              <p className="mt-6 text-gray-600 dark:text-white">
                At <span className='text-gray-900 dark:text-white text-lg font-bold'>FreshCart</span>, our journey began with a simple yet
                profound mission: to deliver exceptional products that inspire
                and enhance everyday lives. Founded by a passionate team of
                innovators and dreamers, we embarked on a quest to blend quality
                craftsmanship with modern design. What started as a small idea
                has grown into a thriving community, driven by our commitment to
                excellence and customer satisfaction. Each product we offer
                reflects our dedication to creating meaningful and memorable
                experiences. Join us as we continue to explore new horizons,
                always with the goal of making a positive impact on the world,
                one product at a time.
              </p>
              <p className="mt-4 text-gray-600 dark:text-white">
                Our values are rooted in integrity and innovation, and we strive
                to foster a culture of creativity and collaboration. As we move
                forward, our focus remains on delivering unparalleled value to
                our customers and making a difference in every way we can.
              </p>
            </div>
          </div>
      {/*  */}
      <div className="text-center">
      <h3 className="text-2xl font-bold text-start text-gray-800 dark:text-white mt-20">Key Milestones</h3>
        <ul className="mt-4 text-lg text-gray-700 dark:text-white list-disc list-inside text-start">
          <li><strong>2010:</strong> Launched our first product line.</li>
          <li><strong>2015:</strong> Expanded to international markets.</li>
          <li><strong>2020:</strong> Reached 1 million satisfied customers.</li>
          <li><strong>2023:</strong> Introduced new eco-friendly product line.</li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-20">Meet the Team</h3>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <img
              src={img1}
              alt="Team Member"
              className="w-24 h-24 object-cover mx-auto rounded-full shadow-lg"
            />
            <h4 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">Jane Doe</h4>
            <p className="text-gray-700 dark:text-white">CEO & Founder</p>
          </div>
          <div className="text-center">
            <img
              src={img2}
              alt="Team Member"
              className="w-24 h-24 object-cover mx-auto rounded-full shadow-lg"
            />
            <h4 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">John Smith</h4>
            <p className="text-gray-700 dark:text-white">Chief Designer</p>
          </div>
          <div className="text-center">
            <img
              src={img3}
              alt="Team Member"
              className="w-24 h-24 object-cover mx-auto rounded-full shadow-lg"
            />
            <h4 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">Jane Doe</h4>
            <p className="text-gray-700 dark:text-white">CEO & Founder</p>
          </div>
          {/* <!-- Add more team members as needed --> */}
        </div>

        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-20">What Our Customers Say</h3>
        <blockquote className="mt-4 border-l-4 border-gray-500 pl-4 text-lg text-gray-700 dark:text-white italic">
          "FreshCart has transformed the way I shop. Their quality and service are unmatched!" - Alex T.
        </blockquote>
        {/* <!-- Add more testimonials as needed --> */}

        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-20">Looking Ahead</h3>
        <p className="mt-4 text-lg text-gray-700 dark:text-white">
          We are excited about the future as we continue to innovate and expand our product offerings. Our goal is to set new standards in the industry and bring even more value to our customers.
        </p>

        <a
          href="/about"
          className="inline-block bg-gray-500 text-black dark:text-white py-3 px-6 rounded-full text-lg font-semibold shadow-md hover:bg-gray-600 transition-transform transform hover:scale-105 mt-8"
        >
          Learn More
        </a>
      </div>
        </div>
      </div>
      
    </>
  );
}
