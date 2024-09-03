import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import HeroSection from "../../Components/HeroSection/HeroSection";
import BrandsSlider from "../../Components/BrandsSlider/BrandsSlider";
import FeaturedProducts from "../../Components/FeaturedProducts/FeaturedProducts";
import Testimonial from "../../Components/Testimonial/Testimonial";
import BlogHighlights from "../../Components/BlogHighlights/BlogHighlights";
import CategorySection from "../../Components/CategorySection/CategorySection";
import LoadingScreen from "../../Components/loadingScrean/loadingScrean";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const userToken = localStorage.getItem('token');

  return (
    <>
      <Helmet>
        <title>FreshCart</title>
      </Helmet>
      <HeroSection />
      <FeaturedProducts userToken={userToken} products={products} isLoading={isLoading} />
      <Testimonial />
      <BlogHighlights />
      <CategorySection />
    <section className="py-10 dark:bg-gray-950">
      <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">"Experience Premium Quality from Top-Rated Brands"</h2>
      {isLoading ? <LoadingScreen /> : <BrandsSlider />}
    </section>

    </>
  );
}


