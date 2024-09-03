import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import StarRating from '../../Components/starRating/StarRating';
import LoadingScreen from '../../Components/loadingScrean/loadingScrean';
import { Link } from 'react-router-dom';

export default function Orders() {
    let [extractedDate , setExtractedDate] = useState('')
    let [extractedTime , setExtractedTime] = useState('')
    const [isLoading , setIsLoading] = useState(false)
    const [orders, setOrders] = useState([])
    useEffect(()=>{
        getUserOrders()
    }, [])
  const token = localStorage.getItem('token'); // Replace with your actual token
  if (!token) {
    return <div>No token found</div>;
  }

  // Decode the token
  const decodedToken = jwtDecode(token);

  // Extract the ID from the token
  const userId = decodedToken.id; // Adjust 'id' to the correct field name in your token's payload
  

  async function getUserOrders(){
    setIsLoading(true)
try {
    const {data} = await axios('https://ecommerce.routemisr.com/api/v1/orders/user/' + userId);
    
    setOrders(data)
    const dateTimeString = data[0].createdAt;
    const date = new Date(dateTimeString);
    const extractedDate = date.toISOString().split('T')[0];
    setExtractedDate(extractedDate);
    const extractedTime = date.toISOString().split('T')[1].split('.')[0];
    setExtractedTime(extractedTime);
    
} catch (error) {
    console.log(error);
}finally{
    setIsLoading(false)
    
}    
  }
  if (isLoading) return <LoadingScreen />;
    return (
        <>
            <Helmet>
                <title>All Orders</title>
            </Helmet>
            <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto dark:bg-gray-950">
                <span className='dark:text-white'>Home</span>
                <h1 className='dark:text-white mb-10 text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800'>Orders</h1>

                {orders.length === 0 ? (
                    <div className="flex items-center justify-center h-screen px-4">
                    <div className="text-center">
                      <div className="text-2xl md:text-4xl font-bold text-gray-700 mb-4">
                        No Orders Found
                      </div>
                      <p className="text-sm md:text-lg text-gray-500 mb-6">
                        It looks like you don't have any orders yet. Check back later or explore other parts of our site.
                      </p>
                      <Link to={"/"} className="inline-block px-6 py-3 text-sm font-medium leading-5 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out">
                        Go to Homepage
                      </Link>
                    </div>
                  </div>
                ) : (
                    orders.map((order) => {
                        return (
                            <div key={order._id}>
                                <div className="flex mt-10 justify-start item-start space-y-2 flex-col">
                                    <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 line-clamp-1" title={order._id}>Order #{order._id}</h1>
                                    <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">{extractedDate} at {extractedTime}</p>
                                </div>

                                <div  className="mt-10 flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">

                                    <div   className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                                        <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Cart</p>
                                {order.cartItems.map((item, index) => (
                                    (
                                    <>
                                        <div key={index} className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                            <div className="pb-4 md:pb-8 w-full md:w-40">
                                                <img className="w-full hidden md:block" src={item.product.imageCover} alt={item.product.title} />
                                                <img className="w-full md:hidden" src={item.product.imageCover} alt={item.product.title} />
                                            </div>
                                            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                                <div className="w-full flex flex-col justify-start items-start space-y-8">
                                                    <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800 line-clamp-1">{item.product.title}</h3>
                                                    <div className="flex justify-start items-start flex-col space-y-2">
                                                        <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Category: </span> {item.product.category.name}</p>
                                                        <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Brand: </span> {item.product.brand.name}</p>
                                                        <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300"><StarRating ratingAverage={item.product.ratingsAverage} /></span></p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between space-x-8 items-start w-full">
                                                    <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">Quantity: {item.count}</p>
                                                    <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">${item.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    )
                                ))}
                                </div>
                                    <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                                            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
                                            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                                <div className="flex justify-between w-full">
                                                    <p className="text-base dark:text-white leading-4 text-gray-800">Tax Price:</p>
                                                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">${order.taxPrice}</p>
                                                </div>
                                                <div className="flex justify-between items-center w-full">
                                                    <p className="text-base dark:text-white leading-4 text-gray-800">Shipping Price:</p>
                                                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">${order.shippingPrice}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center w-full">
                                                <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total Price:</p>
                                                <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">${order.totalOrderPrice}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                                            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Shipping Address</h3>
                                            <div className="flex flex-col justify-start items-start w-full space-y-4">
                                                <p className="text-base dark:text-white leading-6 text-gray-800">{order.shippingAddress.details}</p>
                                                <p className="text-base dark:text-white leading-6 text-gray-800">{order.shippingAddress.phone}</p>
                                                <p className="text-base dark:text-white leading-6 text-gray-800">{order.shippingAddress.city}</p>
                                            </div>
                                        </div>
                                    </div>
                                        </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </>
    );
}