import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // Categories state
  const [categories, setCategories] = useState([]);

  // Products state
  const [products, setProducts] = useState([]);

  // Wishlist state
  const [wishlistItems, setWishlistItems] = useState([]);

  // Cart state
  const [cartItems, setCartItems] = useState([]);

  // Load initial data from localStorage if available
  useEffect(() => {
    try {
      const storedCategories = localStorage.getItem('categories');
      const storedProducts = localStorage.getItem('products');
      const storedWishlist = localStorage.getItem('wishlist');
      const storedCart = localStorage.getItem('cart');

      if (storedCategories) setCategories(JSON.parse(storedCategories));
      if (storedProducts) setProducts(JSON.parse(storedProducts));
      if (storedWishlist) setWishlistItems(JSON.parse(storedWishlist));
      if (storedCart) setCartItems(JSON.parse(storedCart));
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Category functions
  const addCategory = (name) => {
    const newCategory = {
      id: Date.now(),
      name,
      icon: null,
      subcategories: []
    };
    setCategories([...categories, newCategory]);
    return newCategory;
  };

  // Subcategory functions
  const addSubCategory = (categoryId, name) => {
    const updatedCategories = categories.map(category => {
      if (category.id === Number(categoryId)) {
        return {
          ...category,
          subcategories: [
            ...category.subcategories,
            {
              id: Date.now(),
              name,
              icon: null
            }
          ]
        };
      }
      return category;
    });
    setCategories(updatedCategories);
  };

  // Product functions
  const addProduct = (productData) => {
    const { title, subCategoryId, description, variants, imageUrls = [] } = productData;

    const lowestPriceVariant = variants.reduce((prev, current) =>
      parseFloat(prev.price) < parseFloat(current.price) ? prev : current
    );

    const newProduct = {
      id: Date.now(),
      title,
      subCategoryId: Number(subCategoryId),
      description,
      price: parseFloat(lowestPriceVariant.price),
      variants,
      rating: 5,
      imageUrl: imageUrls.length > 0
        ? imageUrls[0]
        : 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=500&auto=format&fit=crop',
      imageUrls
    };

    setProducts([...products, newProduct]);
    return newProduct;
  };

  // Wishlist functions
  const addToWishlist = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product && !wishlistItems.some(item => item.id === productId)) {
      setWishlistItems([...wishlistItems, product]);
      return true;
    }
    return false;
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  // 🛒 Cart functions
  const addToCart = (product, quantity = 1, selectedVariant = null) => {
    const existingItem = cartItems.find(
      item => item.id === product.id && item.variant?.id === selectedVariant?.id
    );

    if (existingItem) {
      const updatedCart = cartItems.map(item =>
        item === existingItem
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, quantity, variant: selectedVariant }]);
    }
  };

  const removeFromCart = (productId, variantId = null) => {
    setCartItems(cartItems.filter(item =>
      item.id !== productId || (variantId && item.variant?.id !== variantId)
    ));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateCartItemQuantity = (productId, variantId, newQuantity) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === productId && item.variant?.id === variantId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  return (
    <StoreContext.Provider value={{
      // Categories
      categories,
      addCategory,

      // Subcategories
      addSubCategory,

      // Products
      products,
      addProduct,

      // Wishlist
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,

      // Cart
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      updateCartItemQuantity,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

// Custom hook to use the store context
export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
