import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import ImgSlider from "../imgSlider/imgSlider";
import StarRating from "../starRating/StarRating";
import { Slide, toast } from "react-toastify";
import { CartContext } from "../../context/cartContext";
import { WishlistContext } from "../../context/WishlistContext";

export default function Product({ products }) {
  
 
  
  
  const { addProductToCart } = useContext(CartContext);
  const { wishlist, addProductToWishlist, removeProductFromWishlist } = useContext(WishlistContext);
  const location = useLocation();
  const currentUrl = location.pathname;

  const isProductInWishlist = (productId) => wishlist?.some(product => product._id === productId);

  async function handleWishlistClick(e, productId) {
    if (isProductInWishlist(productId)) {
      await removeProductFromWishlist(productId);
    } else {
      await addProductToWishlist(productId);
      toast.success('Product added to wishlist', {
        position: "bottom-right",
        autoClose: 2000,
        transition: Slide,
        theme: "colored"
      });
    }

    if (e) {
      e.target.classList.toggle('text-rose-500');
    }
  }

  return (
    <main className="py-5 dark:bg-gray-950">
      <div className="container mx-auto">
        <div className="flex flex-wrap lg:gap-3 justify-center xl:justify-normal">
          <div className="mt-6 lg:mt-0 lg:px-2 w-full">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products?.map(product => (
                <div key={product._id} className="mx-auto mt-6 relative p-4 w-full max-w-sm transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                  <Link to={`/ProductDetails/${product._id}`}>
                    <ImgSlider imgs={product.images} answer={false} showArrows={false} />
                  </Link>
                  <h4 className="mt-2 text-lg line-clamp-1 font-medium text-gray-700 dark:text-gray-200">{product.title}</h4>
                  <p className="mb-2 line-clamp-1 text-base dark:text-gray-300 text-gray-700">
                    {product.description}
                  </p>
                  <StarRating ratingAverage={product.ratingsAverage} />
                  <div className="flex items-center justify-between">
                    <p className="text-blue-500">${product.price}</p>
                    <i
                      onClick={(e) => handleWishlistClick(e, product._id)}
                      className={`fa-solid fa-heart wish ${isProductInWishlist(product._id) ? 'text-rose-500' : ''}`}
                    ></i>
                  </div>
                  <button onClick={() => addProductToCart(product._id)} className="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white dark:text-slate-800 capitalize transition-colors duration-200 transform dark:bg-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    <span className="mx-1">Add to cart</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {currentUrl === '/' ?  (
          <button className="bg-gray-800 text-white p-3 my-10 block rounded w-40 mx-auto hover:text-gray-500 hover:bg-white hover:border-2 hover:border-gray-500 transition duration-500">
            <Link to={'/products'}>View All Products</Link>
          </button>
        ) : null }
      </div>
    </main>
  );
}





