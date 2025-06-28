import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [orders, setOrders] = useState([]);

  // Load cart and wishlist from localStorage
  useEffect(() => {
    if (isAuthenticated && user) {
      const savedCart = localStorage.getItem(`cart_${user.id}`) || localStorage.getItem('cartItems');
      const savedWishlist = localStorage.getItem(`wishlist_${user.id}`) || localStorage.getItem('wishlistItems');
      const savedOrders = localStorage.getItem(`orders_${user.id}`);

      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist));
      }
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    }
  }, [isAuthenticated, user]);

  // Save to localStorage whenever cart or wishlist changes
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartItems));
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(wishlistItems));
      localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(`orders_${user.id}`, JSON.stringify(orders));
    }
  }, [orders, isAuthenticated, user]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const moveToWishlist = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
      addToWishlist(item);
      removeFromCart(productId);
    }
  };

  const addToWishlist = (product) => {
    setWishlistItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems;
      }
      return [...prevItems, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const moveToCart = (productId) => {
    const item = wishlistItems.find(item => item.id === productId);
    if (item) {
      addToCart(item);
      removeFromWishlist(productId);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now().toString(),
      ...orderData,
      items: [...cartItems],
      total: getCartTotal(),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      trackingStages: [
        { stage: 'Order Confirmed', completed: true, date: new Date().toISOString() },
        { stage: 'Processing', completed: false, date: null },
        { stage: 'Shipped', completed: false, date: null },
        { stage: 'Out for Delivery', completed: false, date: null },
        { stage: 'Delivered', completed: false, date: null }
      ]
    };
    
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId, stageIndex) => {
    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (order.id === orderId) {
          const updatedStages = order.trackingStages.map((stage, index) => {
            if (index <= stageIndex) {
              return { ...stage, completed: true, date: new Date().toISOString() };
            }
            return stage;
          });
          return { ...order, trackingStages: updatedStages };
        }
        return order;
      })
    );
  };

  const value = {
    cartItems,
    wishlistItems,
    orders,
    addToCart,
    removeFromCart,
    updateQuantity,
    moveToWishlist,
    addToWishlist,
    removeFromWishlist,
    moveToCart,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    createOrder,
    updateOrderStatus
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};