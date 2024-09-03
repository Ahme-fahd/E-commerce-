import React from 'react'
import LoadingScrean from "../loadingScrean/loadingScrean";
import Product from "../Product/Product";

export default function FeaturedProducts({isLoading , products , userToken}) {

  return (
    <>
        {/* Featured Products Section */}
        <section className="py-0 md:py-16 bg-gray-100 dark:bg-gray-950 dark:text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
        {isLoading ? 
        <LoadingScrean />
       : 
        <Product products={products.slice(0, 10)} userToken={userToken} />}
      </div>
    </section>
    </>
  )
}
