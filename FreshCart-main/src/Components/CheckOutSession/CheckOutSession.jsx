
    import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

export default function CheckOutSession() {
  const {cartId} = useParams();
  const [isLoading , setIsLoading] = useState(false);
  
    const { handleSubmit, values, handleChange, handleBlur, } = useFormik({
        initialValues: {
          details: '',
          phone: '',
          city: '',
        },
        onSubmit: CheckOut,
        validationSchema: Yup.object({
          details: Yup.string().required("details is required"),
          phone: Yup.string().required("Phone is required"),
          city: Yup.string().required("city is required"),
        })
      });
      

      async function CheckOut(){
        setIsLoading(true)
          await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/` + cartId
            , {shippingAddress: values},{
              headers:{
                token: localStorage.getItem('token')
              },
              params:{
                url: 'http://localhost:5173'
              }
            }
          ).then(({ data })=>{
            
            location.href = data.session.url
            
          }).catch((error)=>{
            console.log(error.response.data.message);
          }).finally(()=>{
            
            setIsLoading(false)
          })
      }

  return (
    <>
    <Helmet>
      <title>Check Out</title>
    </Helmet>
    <div className=' min-h-screen flex items-center justify-center dark:bg-gray-950'>
    <div className="w-full md:w-1/2 lg:w-1/3 mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center mt-5">
      <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to FreshCart</h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="flex items-start flex-col justify-start">
          <label htmlFor="details" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Details:</label>
          <input onBlur={handleBlur} onChange={handleChange} value={values.details} type="text" id="details" name="details" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
        </div>

        <div className="flex items-start flex-col justify-start">
          <label htmlFor="phone" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Phone:</label>
          <input onBlur={handleBlur} onChange={handleChange} value={values.phone} type="tel" id="phone" name="phone" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
        </div>


        <div className="flex items-start flex-col justify-start">
          <label htmlFor="city" className="text-sm text-gray-700 dark:text-gray-200 mr-2">city:</label>
          <input onBlur={handleBlur} onChange={handleChange} value={values.city} type="text" id="city" name="city" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
        </div>



        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500" disabled={isLoading}>Check Out{isLoading && <i className='fa-solid fa-spinner fa-spin'></i>}</button>
      </form>

    </div>
  </div>
    </>
  )
}
