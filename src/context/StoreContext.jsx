import React, { createContext, useContext, useState, useEffect } from 'react';
import { categoryAdding, addSubCategoryAPI, getAllCategories } from '../services/allApies';

// Create context
const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // States
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // ✅ Fetch categories on component mount
  

  // 👉 Add Category
  const addCategory = async (name) => {
    const categoryData = { NCategory: name };
    const token = sessionStorage.getItem('token');
    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };

    try {
      const response = await categoryAdding(categoryData, header);
      if (response.status === 200 || response.status === 201) {
        const savedCategory = {
          id: response.data._id,
          name: response.data.NCategory,
          subcategories: []
        };
        setCategories([...categories, savedCategory]);
        return savedCategory;
      } else {
        console.error("Failed to add category:", response);
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // 👉 Add Subcategory
  const addSubCategory = async (categoryId, name) => {
    const subCategoryData = {
      categoryId,
      subCategoryName: name
    };
    const token = sessionStorage.getItem('token');
    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };

    try {
      const response = await addSubCategoryAPI(subCategoryData, header);
      if (response.status === 200 || response.status === 201) {
        const savedSubCategory = response.data;

        const updatedCategories = categories.map(category => {
          if (category.id === Number(categoryId)) {
            return {
              ...category,
              subcategories: [
                ...(category.subcategories || []),
                savedSubCategory
              ]
            };
          }
          return category;
        });

        setCategories(updatedCategories);
        return savedSubCategory;
      } else {
        console.error("Failed to add subcategory:", response);
      }
    } catch (error) {
      console.error("Error adding subcategory:", error);
    }
  };

  // 👉 Add Product
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

  // 👉 Wishlist functions
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

  // 👉 Cart functions
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
