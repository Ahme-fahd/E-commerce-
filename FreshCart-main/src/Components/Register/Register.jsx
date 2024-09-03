import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { UserContext } from '../../context/userContext';

export default function Register() {
  const [isloading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const {setUser} = useContext(UserContext); 
  const navigate = useNavigate()
  const { handleSubmit, values, handleChange, errors, handleBlur, touched } = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      rePassword: ''
    },
    onSubmit: register,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required").min(3, "Name must be more than 2 characters").max(20, "Name must be less than 20 characters"),
      email: Yup.string().required("Email is required").email('Enter a valid email'),
      phone: Yup.string().required("Phone number is required").matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Enter a valid phone number'),
      password: Yup.string().required("Password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must be at least 8 characters long and include letters and numbers"),
      rePassword: Yup.string().required("Confirm password is required").oneOf([Yup.ref("password")], "Passwords must match")
    })
  });

  

  async function register() {
      
    setIsLoading(true)
      
      await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then(({data})=>{
        setIsLoading(false);
        setSuccessMessage(data.message);
        setErrorMessage('');
        setUser(values);
        navigate('/login');
        
      }).catch((error)=>{
        
        setIsLoading(false)
        
        setErrorMessage(error.response.data.message)
        setSuccessMessage('')
      })
  }

  
  return (
    <div>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className=' min-h-screen flex items-center justify-center dark:bg-gray-950 py-10'>
    <div className="w-full md:w-1/2 lg:w-1/3 mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center mt-5">
      <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to FreshCart</h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

      <div className="flex items-start flex-col justify-start">
            <label htmlFor="username" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Username:</label>
            <input onBlur={handleBlur} onChange={handleChange} value={values.name} type="text" id="username" name="name" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {touched.name && errors.name && <p className="text-red-600">{errors.name}</p>}
          </div>


          <div className="flex items-start flex-col justify-start">
            <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
            <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" id="email" name="email" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {touched.email && errors.email && <p className="text-red-600">{errors.email}</p>}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="phone" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Phone number:</label>
            <input onBlur={handleBlur} onChange={handleChange} value={values.phone} type="tel" id="phone" name="phone" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {touched.phone && errors.phone && <p className="text-red-600">{errors.phone}</p>}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Password:</label>
            <input onBlur={handleBlur} onChange={handleChange} value={values.password} type="password" id="password" name="password" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {touched.password && errors.password && <p className="text-red-600">{errors.password}</p>}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="confirmPassword" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Confirm Password:</label>
            <input onBlur={handleBlur} onChange={handleChange} value={values.rePassword} type="password" id="confirmPassword" name="rePassword" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {touched.rePassword && errors.rePassword && <p className="text-red-600">{errors.rePassword}</p>}
          </div>


          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500" disabled={isloading}>Register {isloading && <i className='fa-solid fa-spinner fa-spin'></i>}</button>
          {errorMessage && <p className='text-red-500 text-center'>{errorMessage}</p>}
          {successMessage && <p className='text-green-500 text-center'>{successMessage}</p>}
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-500 dark:text-gray-300">Already have an account? </span>
          <Link to={'/login'} className="text-blue-500 hover:text-blue-600">Login</Link>
        </div>
    </div>
  </div>

      {/* <div className='dark:bg-gray-950'>
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center mt-5">
        <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to FreshCart</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex items-start flex-col justify-start">
            <label htmlFor="username" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Username:</label>
            <input onBlur={handleBlur} onChange={handleChange} value={values.name} type="text" id="username" name="name" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {touched.name && errors.name && <p className="text-red-600">{errors.name}</p>}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
            <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" id="email" name="email" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {touched.email && errors.email && <p className="text-red-600">{errors.email}</p>}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="phone" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Phone number:</label>
            <input onBlur={handleBlur} onChange={handleChange} value={values.phone} type="tel" id="phone" name="phone" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {touched.phone && errors.phone && <p className="text-red-600">{errors.phone}</p>}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Password:</label>
            <input onBlur={handleBlur} onChange={handleChange} value={values.password} type="password" id="password" name="password" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {touched.password && errors.password && <p className="text-red-600">{errors.password}</p>}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="confirmPassword" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Confirm Password:</label>
            <input onBlur={handleBlur} onChange={handleChange} value={values.rePassword} type="password" id="confirmPassword" name="rePassword" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            {touched.rePassword && errors.rePassword && <p className="text-red-600">{errors.rePassword}</p>}
          </div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500" disabled={isloading}>Register {isloading && <i className='fa-solid fa-spinner fa-spin'></i>}</button>
          {errorMessage && <p className='text-red-500 text-center'>{errorMessage}</p>}
          {successMessage && <p className='text-green-500 text-center'>{successMessage}</p>}
        </form>

       
      </div>
      </div> */}
    </div>
  );
}
