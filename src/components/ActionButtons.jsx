
import React from 'react';
import { Link } from 'react-router-dom';

const ActionButtons = ({ type }) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {type === 'home' && (
        <>
          <Link 
            to="/add-category" 
            className="bg-brand-orange text-white px-4 py-2 rounded-md hover:bg-amber-500 transition-colors"
          >
            Add category
          </Link>
          <Link 
            to="/add-subcategory" 
            className="bg-brand-orange text-white px-4 py-2 rounded-md hover:bg-amber-500 transition-colors"
          >
            Add sub category
          </Link>
          <Link 
            to="/add-product" 
            className="bg-brand-orange text-white px-4 py-2 rounded-md hover:bg-amber-500 transition-colors"
          >
            Add product
          </Link>
        </>
      )}
      {type === 'product' && (
        <>
          <button 
            className="bg-brand-orange text-white px-4 py-2 rounded-md hover:bg-amber-500 transition-colors"
          >
            Edit product
          </button>
          <button 
            className="bg-brand-orange text-white px-4 py-2 rounded-md hover:bg-amber-500 transition-colors"
          >
            Buy it now
          </button>
          <button 
            className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Heart size={18} />
          </button>
        </>
      )}
    </div>
  );
};

export default ActionButtons;
