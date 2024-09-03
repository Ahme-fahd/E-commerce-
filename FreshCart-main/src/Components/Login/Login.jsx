import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authinticationContext';
import { Helmet } from 'react-helmet';
import { UserContext } from '../../context/userContext';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const {setUserToken} = useContext(AuthContext);
  const {setUser} = useContext(UserContext)
  const navigate = useNavigate()
    const { handleSubmit, values, handleChange, errors, handleBlur, touched } = useFormik({
        initialValues: {
          email: '',
          password: ''
        },
        onSubmit: Login,
        validationSchema: Yup.object({
          email: Yup.string().required("Email is required").email('Enter a valid email'),
          password: Yup.string().required("Password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must be at least 8 characters long and include letters and numbers"),
        })
      });


      async function Login(){
        setIsLoading(true)
        setErrorMessage('');
        setSuccessMessage('');
          await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).then(({ data })=>{
            setUser(data.user);
            
            setIsLoading(false)
            setSuccessMessage(data.message)
            setUserToken(data.token)
            localStorage.setItem('token', data.token)
            navigate('/')
          }).catch((error)=>{
            setIsLoading(false)
            setErrorMessage(error.response.data.message)
          })
      }

  return (
    <>
    <Helmet>
      <title>Login</title>
    </Helmet>
    <div className=' min-h-screen flex items-center justify-center dark:bg-gray-950 py-10'>
    <div className="w-full md:w-1/2 lg:w-1/3 mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center mt-5">
      <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to FreshCart</h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

        <div className="flex items-start flex-col justify-start">
          <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
          <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" id="email" name="email" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          {touched.email && errors.email && <p className="text-red-600">{errors.email}</p>}
        </div>


        <div className="flex items-start flex-col justify-start">
          <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Password:</label>
          <input onBlur={handleBlur} onChange={handleChange} value={values.password} type="password" id="password" name="password" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          {touched.password && errors.password && <p className="text-red-600">{errors.password}</p>}
        </div>


        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500" disabled={isLoading}>Login {isLoading && <i className='fa-solid fa-spinner fa-spin'></i>}</button>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
      </form>

        <span className='underline flex self-start my-3 dark:text-white cursor-pointer ' onClick={()=>{ navigate('/ForgetPassword')}}>Forget password?</span>
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-500 dark:text-gray-300">Don't have an account? </span>
        <Link to={'/register'} className="text-blue-500 hover:text-blue-600">Register</Link>
      </div>
    </div>
  </div>
    </>
  )
}
