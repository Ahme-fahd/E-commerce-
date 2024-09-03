import React from 'react'
import blogImg from '../../assets/blog-img-1.jpeg'
import blogImg2 from '../../assets/blog-img-2.jpeg'
import blogImg3 from '../../assets/blog-img-3.jpeg'
import { Link } from 'react-router-dom'

export default function BlogHighlights() {
  return (
    <>
    
    {/* Blog Highlights Section */}
    <section className="py-16 bg-gray-100 dark:bg-gray-950 dark:text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">From Our Blog</h2>
        {/* Implement a grid for blog posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {
          [1, 2, 3].map((blog , index)=>{
            return(
              <>
          <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <img src={blog == 2 ? blogImg2 : blog == 3 ? blogImg3 : blogImg} alt="Blog Post Title" className="w-full h-40 object-cover rounded-t-lg"/>
            <h3 className="text-xl font-semibold mt-4">Blog Post Title</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2 mb-5">A brief description of the blog post. It highlights the key points or takeaways.</p>
            <Link to="/blog" className="mt-10 bg-gray-800 text-white dark:text-gray-800 dark:bg-white py-2 px-4 rounded-full text-sm font-semibold hover:bg-gray-800">
              Read More
            </Link>
          </div>
              </>
            )
          })
        }
        </div>
      </div>
    </section>
    </>
  )
}
