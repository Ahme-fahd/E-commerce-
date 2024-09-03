import React, { useContext } from 'react'
import { AuthContext } from '../../context/authinticationContext'
import { Link } from 'react-router-dom'

export default function ProtectedROUTE({children}) {
    const {userToken} = useContext(AuthContext)

  return (
    <>
        {
        userToken ? children : 
        <section className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md mx-auto text-center">
            <h1 className="text-2xl font-semibold text-gray-700 mb-6">Access Denied</h1>
            <p className="text-gray-600 mb-8">Please log in to access this page.</p>
            <Link to={'/login'} className="inline-block px-6 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition duration-300">Go to Login</Link>
        </div>
    </section>
        }
    </>
  )
}
