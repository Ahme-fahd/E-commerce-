import React, { useContext } from 'react'
import CategoryContext from '../../context/categoryContext'
import { Link } from 'react-router-dom'

export default function Categories() {
    const {categories} = useContext(CategoryContext)
  return (
    <>
<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-10 dark:bg-gray-950">
    {categories?.map((categorie) => (
        <div
            key={categorie._id}
            className="flex justify-center mt-5 py-5 bg-gray-100 dark:bg-gray-800 items-center hover:shadow-2xl"
        >
            <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-4 transition-transform transform hover:scale-105">
                <figure className="relative">
                    <Link to={`/category/${categorie._id}`}>
                        <img
                            className="w-full h-40 sm:h-48 md:h-60 object-contain rounded-lg shadow-lg transition-transform transform hover:scale-105"
                            src={categorie.image}
                            alt={categorie.name}
                        />
                    </Link>
                </figure>
                <figcaption className="mt-2">
                    <p className="text-center text-sm sm:text-base md:text-lg font-medium dark:text-white text-gray-800 truncate transition-transform transform hover:scale-105">
                        {categorie.name}
                    </p>
                </figcaption>
            </div>
        </div>
    ))}
</div>


    </>
  )
}
