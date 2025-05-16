
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { cart } = useStore(); // Access cart from store
  
  // Calculate total number of items in cart
  const cartItemCount = cart ? cart.reduce((total, item) => total + (item.quantity || 1), 0) : 0;
  
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };
  
  return (
    <nav className="bg-brand-blue text-white py-4 px-4 md:px-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold">TechStore</Link>
        </div>
        
        <div className="w-full md:w-1/2 lg:w-2/5">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Search any thing"
              className="w-full px-4 py-2 rounded-l-md text-black focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              type="submit"
              className="bg-brand-orange text-white px-5 py-2 rounded-r-md hover:bg-yellow-500 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
        
        <div className="flex items-center gap-6">
          <Link to="/wishlist" className="flex items-center gap-1 hover:text-gray-300 transition-colors">
            <Heart size={18} />
            <span className="hidden md:inline">Wishlist</span>
          </Link>
          <Link to="/signin" className="flex items-center gap-1 hover:text-gray-300 transition-colors">
            <User size={18} />
            <span className="hidden md:inline">Sign In</span>
          </Link>
          <Link to="/cart" className="flex items-center gap-1 hover:text-gray-300 transition-colors">
            <ShoppingCart size={18} />
            <span className="hidden md:inline">Cart</span>
            <span className="bg-brand-orange text-xs rounded-full w-5 h-5 flex items-center justify-center ml-1">
              {cartItemCount}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;