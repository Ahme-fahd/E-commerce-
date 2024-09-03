import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import StarRating from '../starRating/StarRating';
import ImgSlider from '../imgSlider/imgSlider';
import LoadingScreen from '../loadingScrean/loadingScrean';
import { Slide, toast } from 'react-toastify';
import { CartContext } from '../../context/cartContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Wishlist from '../Wishlist/Wishlist';
import { WishlistContext } from '../../context/WishlistContext';

export default function ProductDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState(null);
  const { id } = useParams();
  const { getUserCart } = useContext(CartContext);
  const{addProductToWishlist} = useContext(WishlistContext)
  const userToken = localStorage.getItem('token');

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div 
            style={{
              position: 'absolute',
              top: '50%',
              right: '-10px',
              background: 'gray',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              color: 'white',
              zIndex: 2,
            }}
            onClick={onClick}
        >
            ➔ 
        </div>
    );
}

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "-10px",
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
          transform: "rotate(180deg)",
        }}
        onClick={onClick}
      >
        ➔
      </div>
    );
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024, // Small desktops
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768, // Tablets
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 640, // Mobile screens
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

  useEffect(() => {
    let isMounted = true; // flag to check if component is mounted

    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        if (isMounted) {
          setProduct(data.data);
          await getRelatedProducts(data.data.category._id); // Pass the category ID
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    const getRelatedProducts = async (categoryId) => {
      try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products', {
          params: { category: categoryId },
        });
        if (isMounted) {
          setRelatedProduct(data.data);
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchProductDetails();

    return () => {
      isMounted = false; // cleanup function to set flag to false on unmount
    };
  }, [id]);

  const addProductToCart = async (productId) => {
    try {
      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { productId },
        {
          headers: {
            token: userToken,
          },
        }
      );
      await getUserCart(); // Fetch updated cart data
      toast.success(data.message, {
        position: "bottom-right",
        autoClose: 2000,
        transition: Slide,
        theme: "colored",
      });
    } catch (error) {
      toast.error("Failed to add product to cart", {
        position: "bottom-right",
        autoClose: 2000,
        transition: Slide,
        theme: "colored",
      });
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <main className="py-8 dark:bg-gray-950">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-8 gap-x-10 md:gap-x-0">
              <div className="w-full h-64 md:w-3/12 lg:h-96 md:mb-0 mb-4">
                <ImgSlider
                  imgs={product?.images}
                  answer={true}
                  showArrows={false}
                />
              </div>
              <div className="w-full max-w-lg md:mx-auto mx-0 sm:mt-[30rem] md:mt-0 mt-[10rem] md:w-9/12">
                <h3 className="dark:text-white text-gray-700 uppercase text-lg mb-2">
                  {product?.title}
                </h3>
                <span className="dark:text-white text-gray-500 block mb-3">
                  ${product?.price}
                </span>
                <hr className="my-3" />
                <div className="mt-2">
                  <h3 className="text-gray-700 dark:text-white">Rating:</h3>
                  <StarRating ratingAverage={product?.ratingsAverage} />
                </div>
                <div className="mt-3">
                  <h3 className="dark:text-white text-gray-700 uppercase text-lg">
                    Description:
                  </h3>
                  <p className="dark:text-white text-gray-500">
                    {product?.description}
                  </p>
                </div>
                <div className="mt-3">
                  <h3 className="dark:text-white text-gray-700 uppercase text-lg">
                    Category:
                  </h3>
                  <p className="dark:text-white text-gray-500">
                    {product?.category.name}
                  </p>
                </div>
                <div className="mt-3">
                  <h3 className="dark:text-white text-gray-700 uppercase text-lg">
                    SubCategory:
                  </h3>
                  <p className="dark:text-white text-gray-500">
                    {product?.subcategory.name}
                  </p>
                </div>
                <div className="mt-3">
                  <h3 className="dark:text-white text-gray-700 uppercase text-lg">
                    Brand:
                  </h3>
                  <p className="dark:text-white text-gray-500">
                    {product?.brand.name}
                  </p>
                </div>
                <div className="flex items-center mt-6 gap-x-3">
                  <button
                    onClick={() => addProductToCart(product?._id)}
                    className="px-8 py-2 bg-gray-600 text-white dark:text-white text-sm font-medium rounded hover:bg-gray-500 focus:outline-none focus:bg-gray-500"
                  >
                    Order Now
                  </button>
                  <button onClick={()=>{addProductToWishlist(product?._id)}} className="px-8 py-2 bg-rose-600 text-white dark:text-white text-sm font-medium rounded hover:bg-rose-500 focus:outline-none focus:bg-rose-500">
                    Add to favorites
                  </button>
                </div>
              </div>
            </div>

            {/* Related products */}
            <div className="mt-16">
              <h3 className="dark:text-white text-gray-600 text-2xl font-medium">
                Related Products
              </h3>

                <Slider {...settings} className='mt-6 px-5'>
                {relatedProduct?.map((relatedProduct, index) => {
                  // Use console.log here
                  console.log(relatedProduct.images);
                   // Logs each related product item

                  return (
                    <div key={index} className="p-4">
                      <div className="w-full dark:bg-gray-800 bg-white max-w-sm mx-auto rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                        <div className="relative h-56 w-full bg-gray-200 overflow-hidden">
                          <Link
                            to={`/ProductDetails/${relatedProduct._id}`}
                            className="block h-full"
                          >
                            <ImgSlider
                              imgs={relatedProduct?.images}
                              answer={false}
                              className="transition-transform transform hover:scale-110 duration-300"
                            />
                          </Link>
                          <button
                            onClick={() =>
                              addProductToWishlist(relatedProduct?._id)
                            }
                            className="absolute top-2 left-2 p-2 rounded-full bg-transparent border-2 border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white focus:outline-none transition-colors duration-300"
                          >
                            <i className="fas fa-heart"></i>
                          </button>
                          <button
                            onClick={() =>
                              addProductToCart(relatedProduct?._id)
                            }
                            className="absolute top-2 right-2 p-2 rounded-full bg-transparent border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white focus:outline-none transition-colors duration-300"
                          >
                            <i className="fas fa-cart-shopping"></i>
                          </button>
                        </div>
                        <div className="p-5 text-center">
                          <h3 className="dark:text-white text-gray-800 uppercase text-lg font-semibold truncate">
                            {relatedProduct?.title}
                          </h3>
                          <span className="dark:text-white text-gray-600 text-xl font-bold mt-2 block">
                            ${relatedProduct?.price}
                          </span>
                        </div>
                        <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-1"></div>
                      </div>
                    </div>
                  );
                })}
                </Slider>

            </div>
          </div>
        </main>
      )}
    </>
  );
}
