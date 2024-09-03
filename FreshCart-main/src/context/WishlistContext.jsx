import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Slide, toast } from 'react-toastify';
import { AuthContext } from './authinticationContext';

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCounter , setWishlistCounter] = useState(0);
  const { userToken } = useContext(AuthContext)
  useEffect(() => {

    fetchWishlist();
  }, [userToken]);

  async function fetchWishlist() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: {
          token: localStorage.getItem('token')
        }
      });
      setWishlist(data.data);
      setWishlistCounter(data.data.length)
      
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  }

  const addProductToWishlist = async (productId) => {
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId }, {
        headers: {
          token: localStorage.getItem('token')
        }
      });
      toast.success('Product has been successfully added to your wishlist', {
        position: "bottom-right",
        autoClose: 2000,
        transition: Slide,
        theme: 'colored'
      });
      
      fetchWishlist()
      console.log(data.data);
      
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const removeProductFromWishlist = async (productId) => {
    try {
      const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      });
      fetchWishlist()
      setWishlistCounter(data.data.length)
      // Show success message
      toast.success('Product has been successfully deleted from your wishlist', {
        position: "bottom-right",
        autoClose: 2000,
        transition: Slide,
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
      
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  return (
    <WishlistContext.Provider value={{ setWishlist , setWishlistCounter , wishlistCounter , wishlist, addProductToWishlist, removeProductFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}


