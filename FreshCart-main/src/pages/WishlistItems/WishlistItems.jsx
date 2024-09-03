import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/cartContext';
import { WishlistContext } from '../../context/WishlistContext';
import StarRating from '../../Components/starRating/StarRating';

export default function WishlistItems() {
  const { wishlist, removeProductFromWishlist } = useContext(WishlistContext);
  const { addProductToCart } = useContext(CartContext);
  const [visibleItemId, setVisibleItemId] = useState(null);


  const isWishlistEmpty = wishlist?.length === 0;

  const handleToggleVisibility = (id) => {
    setVisibleItemId((prevId) => (prevId === id ? null : id));
  };

  return (
    <section className='dark:bg-gray-950'>
      <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center">
        <div className="flex flex-col justify-start items-start">
          <div>
            <p className="text-sm leading-4 text-gray-600 dark:text-white">Home</p>
          </div>
          <div className="mt-3">
            <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white">Favourites</h1>
          </div>
          <div className="mt-4">
            <p className="text-2xl tracking-tight leading-6 text-gray-600 dark:text-white">{wishlist?.length || 0} items</p>
          </div>
          <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-0">
            {
              isWishlistEmpty ? (
                <div className="flex flex-col justify-center items-center">
                  <p className="dark:text-white">Your Wishlist is empty.</p>
                  <button
                    className="bg-gray-800 text-white dark:bg-white dark:text-gray-800 rounded px-3 py-2 mt-5 hover:bg-gray-600 dark:hover:bg-slate-400"
                  >
                    <Link to={'/products'}>Start Shopping</Link>
                  </button>
                </div>
              ) : (
                wishlist.map((wish) => (
                  <div key={wish._id} className="flex flex-col">
                    <div className="relative">
                      <img className="hidden lg:block" src={wish.imageCover} alt="bag" />
                      <img className="hidden sm:block lg:hidden" src={wish.imageCover} alt="bag" />
                      <img className="sm:hidden" src={wish.imageCover} alt="bag" />
                      <button
                        aria-label="close"
                        onClick={() => removeProductFromWishlist(wish._id)}
                        className="top-4 right-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 absolute p-1.5 bg-gray-800 dark:bg-white dark:text-gray-800 text-white hover:text-gray-400"
                      >
                        <svg className="fill-current" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13 1L1 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M1 1L13 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                    <div className="my-6 flex justify-between items-center">
                      <div className="flex justify-center items-center">
                        <p className="tracking-tight text-2xl font-semibold leading-6 text-gray-800 dark:text-white line-clamp-1" title='wish.title'>{wish.title || 'Product Title'}</p>
                      </div>
                      <div className="flex justify-center items-center">
                        <button
                          aria-label="show menu"
                          onClick={() => handleToggleVisibility(wish._id)}
                          className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-2.5 px-2 bg-gray-800 dark:bg-white dark:text-gray-800 text-white hover:text-gray-400 hover:bg-gray-200"
                        >
                          {visibleItemId === wish._id ? (
                            <svg className="fill-stroke" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : (
                            <svg className="fill-stroke" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 5L5 1L1 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                    {visibleItemId === wish._id && (
                      <div className="flex flex-col justify-start items-start mt-12">
                        <div>
                          <StarRating ratingAverage={wish.ratingsAverage}/>
                        </div>
                        <div className="mt-2">
                          <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">Category: {wish.category.name}</p>
                        </div>
                        <div className="mt-6">
                          <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">Brand: {wish.brand.name}</p>
                        </div>
                        <div className="mt-6">
                          <p className="tracking-tight text-base font-medium leading-4 text-gray-800 dark:text-white">${wish.price || 'Price'}</p>
                        </div>
                        <div className="flex justify-between flex-col lg:flex-row items-center my-10 w-full space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
                          <div className="w-full">
                            <button className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-gray-800 dark:text-white w-full tracking-tight py-4 text-lg leading-4 hover:bg-gray-300 hover:text-gray-800 dark:bg-transparent dark:border-white dark:hover:bg-gray-800 bg-white border border-gray-800 dark:hover:text-white">
                              <Link to={`/ProductDetails/${wish._id}`}>More information</Link>
                            </button>
                          </div>
                          <div className="w-full">
                            <button
                              className="focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-white w-full tracking-tight py-4 text-lg leading-4 hover:bg-black bg-gray-800 border border-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                              onClick={() => addProductToCart(wish._id)}
                            >
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )
            }
          </div>
        </div>
      </div>
    </section>
  );
}

