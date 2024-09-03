import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import NotFound from '../../pages/NotFound/NotFound';
import LoadingScreen from '../loadingScrean/loadingScrean';

export default function CategoryPage() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getProductCategory(id) {
            setIsLoading(true);
            try {
                const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`);

                if (data.data.length > 0 && data.data[0].category) {
                    setCategoryName(data.data[0].category.name);
                } else {
                    setCategoryName('No category name available'); // Fallback text
                }
                setProducts(data.data);
            } catch (error) {
                console.error("Error fetching products by category:", error);
            } finally {
                setIsLoading(false);
            }
        }

        getProductCategory(categoryId);
    }, [categoryId]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="p-4 dark:bg-gray-950 dark:text-white text-center">
            {products.length > 0 ? (
                <>
                    <h1 className="text-2xl font-bold mb-4">Category: {categoryName}</h1>
                    <Product products={products} />
                </>
            ) : (
                <NotFound />
            )}
        </div>
    );
}



