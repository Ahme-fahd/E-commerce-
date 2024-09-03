import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categoryId, setCategoryId] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      try {
          const { data } = await axios('https://ecommerce.routemisr.com/api/v1/categories');
          setCategories(data.data);
      } catch (error) {
          console.error('Error fetching categories:', error);
      }
  }
    async function fetchProducts() {
      try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');

        console.log(data);
        
        
        // Use a Set to store unique category IDs and names
        const uniqueCategoryIds = new Set();
        const uniqueCategoryImgs = new Set();
        const uniqueCategoryNames = new Set();

        data.data.forEach((product) => {
          uniqueCategoryIds.add(product.category._id);
          uniqueCategoryImgs.add(product.category.image);
          uniqueCategoryNames.add(product.category.name);
        });

        // Convert Set back to array
        setCategoryId([...uniqueCategoryIds]);
        setCategoryName([...uniqueCategoryNames]);


      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
    getCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories , categoryId, categoryName }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
