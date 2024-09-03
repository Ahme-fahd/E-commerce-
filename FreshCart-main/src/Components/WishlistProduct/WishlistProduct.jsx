import React from 'react';
import { Link } from 'react-router-dom';

export default function WishlistProduct({ WishlistProduct = [], removeProductFromWishlist }) {

  return (
    <>
      {WishlistProduct?.map((product, index) => (
        <div
          key={product._id || index}
          className="border-b py-2 flex items-center space-x-2"
        >
          <Link to={"/productDetails/" + product._id}>
            <div className="w-24 h-24 flex-shrink-0">
              <img
                src={product.imageCover}
                className="w-full h-full object-cover rounded-lg"
                alt={product.title}
              />
            </div>
          </Link>
          <div className="flex flex-col">
            <p className="line-clamp-1 dark:text-white">{product.title}</p>
            <p className="dark:text-white">${product.price}</p>
            <svg
              onClick={() => removeProductFromWishlist(product._id)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 cursor-pointer duration-150 dark:text-white hover:text-red-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      ))}
    </>
  );
}
