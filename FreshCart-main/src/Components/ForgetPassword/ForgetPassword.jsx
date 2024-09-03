import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {  useState } from 'react';
import { Helmet } from 'react-helmet';
import { Slide, toast } from 'react-toastify';

export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  
  const { handleSubmit, values, handleChange, errors, handleBlur, touched } = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: handleForgetPassword, // Updated function name for clarity
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required').email('Enter a valid email'),
    }),
  });

  localStorage.setItem('userMail', values.email)

  async function handleForgetPassword() {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
        email: values.email, // Corrected the way email is sent
      });

      toast.success('Verification code sent to your email', {
        position: "bottom-right",
        autoClose: 2000,
        transition: Slide,
        theme: "colored"
      });

      setSuccessMessage(response.data.message);
      navigate('/verifyPassword');
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false); // Ensure loading state is turned off
    }
  }
  return (
    <>
    <Helmet>
      <title>Forget Password</title>
    </Helmet>
    <div className=' min-h-screen flex items-center justify-center'>
    <div className="w-full md:w-1/2 lg:w-1/3 mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center mt-5">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

        <div className="flex items-start flex-col justify-start">
          <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
          <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" id="email" name="email" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          {touched.email && errors.email && <p className="text-red-600">{errors.email}</p>}
        </div>


        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500" disabled={isLoading}>Submit{isLoading && <i className='fa-solid fa-spinner fa-spin'></i>}</button>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
      </form>

      
    </div>
  </div>
    </>
  )
}