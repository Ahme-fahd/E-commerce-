import React, { useState, useContext } from 'react';
import { CartContext } from '../../context/cartContext';
import StarRating from '../../Components/starRating/StarRating';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';

export default function CartItems() {
  const { loadingProductId, cartProducts, deleteProductFromCart, clearCart, updateProductCountInCart } = useContext(CartContext);
  const [inputValues, setInputValues] = useState({});
  const products = cartProducts?.products || [];

  function handleCountChange(productId, newCount) {
    const product = products.find(p => p.product._id === productId);
    if (product) {
      const maxQuantity = product.product.quantity;
      console.log(maxQuantity);
      
      if (newCount <= 0) {
        deleteProductFromCart(productId);
      } else if (newCount <= maxQuantity) {
        updateProductCountInCart(productId, newCount);
      } else {
        // Optionally provide feedback to the user
        toast.error(`Cannot exceed available quantity of ${maxQuantity}`);
      }
    }
  }

  function handleInputChange(productId, value) {
    const product = products.find(p => p.product._id === productId);
    if (product) {
      const maxQuantity = product.product.quantity;
      // Allow only numeric values and restrict to 3 digits, and ensure it does not exceed maxQuantity
      const numericValue = value.replace(/[^0-9]/g, '').slice(0, 3);
      const newCount = parseInt(numericValue, 10);
      if (newCount <= maxQuantity || isNaN(newCount)) {
        setInputValues(prev => ({ ...prev, [productId]: numericValue }));
      }
    }
  }

  function handleInputBlur(productId) {
    const newCount = parseInt(inputValues[productId], 10);
    handleCountChange(productId, newCount);
  }

  function handleKeyPress(event, productId) {
    if (event.key === 'Enter') {
      handleInputBlur(productId);
    }
  }

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {products.length === 0 ? (
        <section className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-950">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-10 w-full max-w-md mx-auto text-center">
            <h1 className="text-2xl font-semibold text-gray-700 dark:text-white mb-6">Your Cart is empty</h1>
            <Link to='/products' className="inline-block px-6 py-3 bg-gray-600 text-white dark:bg-white dark:text-gray-800 rounded-full shadow-lg hover:bg-gray-700 dark:hover:bg-slate-600 dark:hover:text-white transition duration-300">Shop now</Link>
          </div>
        </section>
      ) : (
        <div className="bg-gray-100 dark:bg-gray-950 dark:text-white pt-20">
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div className="mx-auto max-w-5xl px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {products.map((product) => (
                product?.product ? (
                  <div key={product._id} className="justify-between mb-6 rounded-lg bg-white dark:bg-gray-900 p-6 shadow-md sm:flex sm:justify-start">
                    <img src={product.product.imageCover} alt="product" className="w-full rounded-lg sm:w-40" />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">{product.product.title}</h2>
                        <p className="mt-1 text-xs text-gray-700 dark:text-white">Category: {product.product.category.name}</p>
                        <p className="mt-1 text-xs text-gray-700 dark:text-white">Brand: {product.product.brand.name}</p>
                        <StarRating ratingAverage={product.product.ratingsAverage} />
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100 dark:bg-gray-950">
                          <button
                            className="cursor-pointer rounded-l bg-gray-100 dark:bg-gray-950 py-1 px-3.5 duration-100 hover:bg-gray-800 hover:text-gray-50 disabled:bg-gray-50 disabled:hover:bg-gray-50"
                            disabled={loadingProductId === product.product._id}
                            onClick={() => handleCountChange(product.product._id, product.count - 1)}
                          >
                            {loadingProductId === product.product._id ? <i className='fa-solid fa-spinner fa-spin'></i> : '-'}
                          </button>
                          <input
                            className="h-8 w-8 border bg-white text-center disabled:bg-gray-50 dark:bg-gray-950 text-xs outline-none"
                            type="text"
                            value={inputValues[product.product._id] || product.count}
                            min="0"
                            maxLength="3"  // Limit to 3 characters
                            disabled={loadingProductId === product.product._id}
                            onChange={(e) => handleInputChange(product.product._id, e.target.value)}
                            onBlur={() => handleInputBlur(product.product._id)}
                            onKeyPress={(e) => handleKeyPress(e, product.product._id)}
                            onFocus={() => setInputValues(prev => ({ ...prev, [product.product._id]: product.count }))}
                          />
                          <button
                            className="cursor-pointer rounded-r bg-gray-100 dark:bg-gray-950 py-1 px-3 duration-100 hover:bg-gray-800 hover:text-gray-50 disabled:bg-gray-50 disabled:hover:bg-gray-50"
                            disabled={loadingProductId === product.product._id}
                            onClick={() => handleCountChange(product.product._id, product.count + 1)}
                          >
                            {loadingProductId === product.product._id ? <i className='fa-solid fa-spinner fa-spin'></i> : '+'}
                          </button>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm">${product.price}</p>
                          <svg
                            onClick={() => deleteProductFromCart(product.product._id)}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-800"
                            disabled={loadingProductId === product.product._id}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null
              ))}
            </div>
            <div className="sticky top-12 mt-6 h-full rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-800 p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700 dark:text-white">Subtotal</p>
                <p className="text-gray-700 dark:text-white">{products.reduce((acc, product) => acc + product.count, 0)} Items</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700 dark:text-white">Shipping</p>
                <p className="text-gray-700 dark:text-white">$0.00</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold dark:text-white">Total</p>
                <div>
                  <p className="mb-1 text-lg font-bold">${cartProducts?.totalCartPrice || '0.00'} USD</p>
                  <p className="text-sm text-gray-700 dark:text-white">including VAT</p>
                </div>
              </div>
              <button className="mt-6 w-full rounded-md dark:bg-gray-950 bg-gray-300 py-1.5 font-medium text-gray-950 dark:text-white hover:bg-gray-600 hover:text-white">
                <Link to={`/checkout/${cartProducts?._id}`}>Check Out</Link>
              </button>
              <button onClick={clearCart} className="mt-6 w-full rounded-md bg-rose-800 py-1.5 font-medium text-rose-50 hover:bg-rose-600">
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}



