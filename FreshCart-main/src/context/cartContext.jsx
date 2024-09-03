import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Slide, toast } from 'react-toastify';
import { AuthContext } from './authinticationContext';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState({ products: [] });
  const [cartCounter , setCartCounter ] = useState(null)
  const [loadingProductId, setLoadingProductId] = useState(null); // Manage loading state per product
  const { userToken } = useContext(AuthContext);

  async function updateProductCountInCart(productId, count) {
    setLoadingProductId(productId); // Set loading state for the specific product
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        {
          headers: { token: userToken }
        }
      );
      // Fetch updated cart data
      await getUserCart();

      toast.success('Product count updated successfully', {
        position: "bottom-right",
        autoClose: 2000,
        transition: Slide,
        theme: "colored"
      });
    } catch (error) {
      toast.error("Failed to update product count", {
        position: "bottom-right",
        autoClose: 2000,
        transition: Slide,
        theme: "colored"
      });
      console.error("Error updating product count:", error);
    } finally {
      setLoadingProductId(null); // Reset loading state
    }
  }

  async function addProductToCart(productId) {
    setLoadingProductId(productId); // Set loading state for the specific product
    try {
      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { productId },
        {
          headers: {
            token: userToken
          }
        }
      );
      // Fetch updated cart data
      await getUserCart();

      toast.success(data.message, {
        position: "bottom-right",
        autoClose: 2000,
        transition: Slide,
        theme: "colored"
      });
    } catch (error) {
      toast.error("Failed to add product to cart", {
        position: "bottom-right",
        autoClose: 2000,
        transition: Slide,
        theme: "colored"
      });
      console.error("Error adding to cart:", error);
    } finally {
      setLoadingProductId(null); // Reset loading state
    }
  }

  async function deleteProductFromCart(id) {
    setLoadingProductId(id); // Set loading state for the specific product
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: {
          token: userToken
        }
      });

      toast.success('Product has been successfully deleted from your cart', {
        position: "bottom-right",
        autoClose: 2000,
        transition: Slide,
        theme: "colored"
      });

      await getUserCart();
    } catch (error) {
      toast.error("Failed to delete product from cart", {
        position: "bottom-right",
        autoClose: 2000,
        transition: Slide,
        theme: "colored"
      });
      console.error("Error deleting product from cart:", error);
    } finally {
      setLoadingProductId(null); // Reset loading state
    }
  }

  async function clearCart() {
    setLoadingProductId('clear'); // Set loading state for clearing cart
    try {
      await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: { token: userToken }
      });

      toast.success('Cart has been successfully cleared', {
        position: "bottom-right",
        autoClose: 2000,
        transition: Slide,
        theme: "colored"
      });

      setCartProducts({ products: [] });
    } catch (error) {
      toast.error("Failed to clear the cart", {
        position: "bottom-right",
        autoClose: 2000,
        transition: Slide,
        theme: "colored"
      });
      console.error("Error clearing cart:", error);
    } finally {
      setLoadingProductId(null); // Reset loading state
    }
  }

  useEffect(() => {
    getUserCart();
  }, [userToken]);

  async function getUserCart() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: { token: userToken }
      });
      setCartProducts(data.data);

      const totalItems = data.data.products.reduce((acc, product) => acc + product.count, 0);
      setCartCounter(totalItems);

    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }

  return (
    <CartContext.Provider value={{ loadingProductId, updateProductCountInCart, setCartProducts, setCartCounter, cartCounter, cartProducts, addProductToCart, deleteProductFromCart, getUserCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

