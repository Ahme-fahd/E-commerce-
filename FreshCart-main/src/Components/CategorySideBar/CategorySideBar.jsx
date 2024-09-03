import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function CategorySideBar() {
  const location = useLocation();
  
  return (
    <>
        <div className={`space-y-3 ${location.pathname == '/' ? 'w-full' : 'lg:w-1/5' } lg:px-2 lg:space-y-4 p-5`}>
            <li className="block font-medium text-gray-500 dark:text-gray-300 hover:underline">
            <Link to={'/womenFashion'}>Women's Fashion</Link>
            </li>
            <li className="block font-medium text-gray-500 dark:text-gray-300 hover:underline"><Link to={'/menFashion'}>Men's Fashion</Link></li>
            <li className="block font-medium text-gray-500 dark:text-gray-300 hover:underline"><Link to={'/Electronics'}>Electronics</Link></li>
            <li className="block font-medium text-gray-500 dark:text-gray-300 hover:underline"><Link to={'/homeLifestyle'}>Home & Lifestyle</Link></li>
            <li className="block font-medium text-gray-500 dark:text-gray-300 hover:underline"><Link to={'/medicine'}>Medicine</Link></li>
            <li className="block font-medium text-gray-500 dark:text-gray-300 hover:underline"><Link to={'/sportOutdoor'}>Sport's & Outdoor</Link></li>
            <li className="block font-medium text-gray-500 dark:text-gray-300 hover:underline"><Link to={'/babyToys'}>Baby's & Toys</Link></li>
            <li className="block font-medium text-gray-500 dark:text-gray-300 hover:underline"><Link to={'/groceriesPets'}>Groceries & Pets</Link></li>
            <li className="block font-medium text-gray-500 dark:text-gray-300 hover:underline"><Link to={'/healthBea'}>Health & Bea</Link></li>
        </div>
    </>
  )
}