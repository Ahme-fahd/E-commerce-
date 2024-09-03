import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingScrean from "../../Components/loadingScrean/loadingScrean";
import { Helmet } from "react-helmet";
import Product from "../../Components/Product/Product";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
        setProducts(data.data || []);
        setFilteredProducts(data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    // Filter products based on the search term
    const filtered = products.filter(product => 
      (product.title || '').toLowerCase().includes(searchValue)
    );
    setFilteredProducts(filtered);
  };

  const userToken = localStorage.getItem('token');
  
  return (
    <>
      <Helmet>
        <title>Shop</title>
      </Helmet>
      {isLoading ? <LoadingScrean /> : 
      <div className="dark:bg-gray-950 py-10">
        <div className="container mx-auto px-6 md:px-12 xl:px-6 ">
          <div>
            <p className="text-sm leading-4 text-gray-600 dark:text-white">Home</p>
          </div>
          <div className="mt-3">
            <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white">Shop</h1>
          </div>
          <div className="mt-4 mb-6 flex justify-center">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              className="p-3 rounded-md border sm:w-1/2 w-full border-gray-300 dark:border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition duration-300 ease-in-out"
              placeholder="Search By Name"
            />
          </div>
          <Product products={filteredProducts} userToken={userToken} />
        </div>
      </div>}
    </>
  );
}
