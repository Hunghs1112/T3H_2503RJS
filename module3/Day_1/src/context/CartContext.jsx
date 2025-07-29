import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getCartsByUser } from '../api/cartApi';
import { toast } from 'react-toastify';
import api from '../api/apiConfig';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [cart, setCart] = useState(() => {
    if (isAuthenticated && user?.id) {
      const savedCart = localStorage.getItem(`cart_${user.id}`);
      return savedCart ? JSON.parse(savedCart) : { items: [], total: 0 };
    }
    return { items: [], total: 0 };
  });

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchCart();
    } else {
      setCart({ items: [], total: 0 });
      if (user?.id) {
        localStorage.removeItem(`cart_${user.id}`);
      }
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
    }
  }, [cart, isAuthenticated, user]);

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const fetchCart = async () => {
    try {
      if (!user?.id) return;
      const response = await getCartsByUser(user.id);
      const userCarts = response.data.carts;
      if (userCarts.length > 0) {
        const latestCart = userCarts[0]; // Use the first cart for initial data
        const cartData = {
          items: latestCart.products.map((item) => ({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            thumbnail: item.thumbnail || 'https://via.placeholder.com/80',
          })),
          total: latestCart.total,
        };
        setCart(cartData);
        localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartData));
       
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Lỗi khi tải giỏ hàng từ server. Sử dụng dữ liệu cục bộ.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const fetchProductDetails = async (productId) => {
    try {
      const response = await api.get(`/products/${productId}`);
      const product = response.data;
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail || 'https://via.placeholder.com/80',
      };
    } catch (error) {
      console.error('Error fetching product details:', error);
      toast.error('Lỗi khi lấy thông tin sản phẩm. Sử dụng dữ liệu mặc định.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return {
        id: productId,
        title: 'Sản phẩm không xác định',
        price: 0,
        thumbnail: 'https://via.placeholder.com/80',
      };
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      if (!isAuthenticated || !user?.id) {
        toast.error('Vui lòng đăng nhập để thêm vào giỏ hàng', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        return;
      }

      let updatedItems;
      const existingItem = cart.items.find((item) => item.id === productId);

      if (existingItem) {
        updatedItems = cart.items.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        const product = await fetchProductDetails(productId);
        updatedItems = [...cart.items, { ...product, quantity }];
      }

      const newCart = {
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };

      setCart(newCart);
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(newCart));
     
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Lỗi khi thêm vào giỏ hàng. Vui lòng thử lại.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      if (quantity < 1) {
        toast.error('Số lượng phải lớn hơn 0.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        return;
      }

      const updatedItems = cart.items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );

      const newCart = {
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };

      setCart(newCart);
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(newCart));
     
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Lỗi khi cập nhật giỏ hàng. Vui lòng thử lại.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const updatedItems = cart.items.filter((item) => item.id !== productId);
      const newCart = {
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };

      setCart(newCart);
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(newCart));
     
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Lỗi khi xóa sản phẩm. Vui lòng thử lại.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const clearCart = async () => {
    try {
      const newCart = { items: [], total: 0 };
      setCart(newCart);
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(newCart));
    
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Lỗi khi xóa giỏ hàng. Vui lòng thử lại.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartItem, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};