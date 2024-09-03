import React from 'react';
import CategorySlider from "../CategorySlider/CategorySlider";
import { Link } from 'react-router-dom';

export default function CategorySection() {
  return (
    <>
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Browse By Category
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-white">
              Discover our diverse range of products organized into categories to help you find exactly what you need.
            </p>
          </div>
          <div className="relative">
            <CategorySlider />
          </div>
          <div className="text-center mt-6 sm:mt-8">
            <Link
              to="/categories"
              className="inline-block bg-gray-800 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-full text-sm sm:text-lg font-semibold shadow-md hover:bg-gray-600 transition-transform transform hover:scale-105"
            >
              Explore All Categories
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
