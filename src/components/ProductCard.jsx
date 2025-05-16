import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { useStore } from '../context/StoreContext';
import { toast } from '@/hooks/use-toast';

const ProductCard = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist, addToCart } = useStore();
  
  const handleWishlistToggle = (e) => {
    e.preventDefault(); // Prevent navigation to product detail
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.title} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product.id);
      toast({
        title: "Added to wishlist",
        description: `${product.title} has been added to your wishlist.`,
      });
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation to product detail
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };
  
  const inWishlist = isInWishlist(product.id);
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 relative">
      <button 
        className="absolute top-2 right-2 bg-white rounded-full p-1 hover:bg-gray-100 z-10"
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        onClick={handleWishlistToggle}
      >
        <Heart 
          size={18}
          className={inWishlist ? "text-red-500" : "text-gray-500 hover:text-red-500 transition-colors"}
          fill={inWishlist ? "#ef4444" : "none"}
        />
      </button>
      
      <Link to={`/product/${product.id}`} className="block p-4">
        <div className="w-full h-48 flex items-center justify-center mb-4">
          <img 
            src={product.imageUrl}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        
        <h3 className="font-medium text-gray-800 mb-1 truncate">{product.title}</h3>
        
        <div className="flex items-center mb-2">
          <StarRating rating={product.rating} />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</div>
          <button
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
            aria-label="Add to cart"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={16} className="mr-1" />
            
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;