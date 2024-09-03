import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cartContext";

export default function Cart({ isOpen , setIsOpen, toggleCart }) {
  const { cartProducts, deleteProductFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Ensure cartProducts is not null or undefined
  const products = cartProducts?.products || [];
  const isCartEmpty = products.length === 0;
  
  function navigation(navigationDistance){
    setIsOpen(false);
    navigate(navigationDistance);
  }

  return (
    <div>
      <div
        className={`w-full fixed top-13 lg:top-0 right-0 sm:w-80 h-full p-2 bg-white dark:bg-gray-800 shadow-lg transition-transform transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transition: 'transform 0.3s ease-in-out' }}
      >
        <div className="border-b">
          <button
            onClick={toggleCart}
            className="absolute top-4 right-4 text-gray-600 dark:text-white"
          >
            <i className="fa-solid fa-x"></i>
          </button>
          <h2 className="text-xl font-bold p-4 dark:text-white">Your Cart</h2>
        </div>
        {isCartEmpty ? (
          <div className="flex flex-col justify-center items-center">
            <p className="dark:text-white">Your cart is empty.</p>
            <button
              onClick={toggleCart}
              className="bg-gray-800 dark:bg-white dark:text-gray-800 text-white rounded px-3 py-2 mt-5 hover:bg-gray-600 dark:hover:bg-slate-700 dark:hover:text-white"
            >
              <Link to={'/products'}>Start Shopping</Link>
            </button>
          </div>
        ) : (
          <div className="overflow-y-auto h-[calc(100%-4rem)] p-4">
            {products.map((product, index) => {
              
              return (
                <div
                  key={index}
                  className="border-b py-2 flex items-center space-x-2"
                >
                  <Link to={"/productDetails/" + product.product._id}>
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={product.product.imageCover}
                        className="w-full h-full object-cover rounded-lg"
                        alt={product.product.title}
                      />
                    </div>
                  </Link>
                  <div className="flex flex-col">
                    <p className="line-clamp-1 dark:text-white">
                      {product.product.title}
                    </p>
                    <p className="dark:text-white">${product.price}</p>
                    <svg
                      onClick={() => deleteProductFromCart(product.product._id)}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 cursor-pointer dark:text-white duration-150 hover:text-red-800"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              );
            }
            )}
            <div className="flex items-center justify-center gap-3">
              <button onClick={()=>{navigation('cart')}} className="bg-white border-2 border-gray-800 p-2 text-gray-800 dark:bg-gray-800 dark:border-white dark:text-white text-center rounded mt-5 hover:text-white hover:bg-gray-800 dark:hover:text-gray-800 dark:hover:bg-white transition-all duration-700">
                View Cart
              </button>
              <button onClick={()=>{navigation('checkout/'+cartProducts?._id)}}  className="bg-gray-800 p-2 text-white dark:bg-white dark:text-gray-800 text-center rounded mt-5 hover:text-gray-800 hover:border-2 hover:border-gray-800 hover:bg-white dark:hover:text-white dark:hover:border-white dark:hover:bg-gray-800 transition-all duration-700">
                Check Out 
              </button>
            </div>
          </div>
          
        )}
      </div>
    </div>
  );
}

{/*to={'checkout/'+cartProducts?._id}*/ }