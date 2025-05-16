
import React from 'react';
import Navbar from '../components/Navbar';
import Breadcrumb from '../components/Breadcrumb';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { toast } from '@/hooks/use-toast';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useStore();
  
  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Wishlist' },
  ];
  
  const handleRemoveItem = (id) => {
    console.log('Remove item with ID:', id);
    removeFromWishlist(id);
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your wishlist.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-xl font-semibold mb-6">Wishlist</h1>
          
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
              <Link 
                to="/" 
                className="text-brand-blue hover:underline"
              >
                Start shopping
              </Link>
            </div>
          ) : (
            <div className="divide-y">
              {wishlistItems.map(item => (
                <div key={item.id} className="py-4 flex items-center gap-4">
                  <div className="flex-shrink-0 w-20 h-20">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-800 mb-1">{item.title}</h3>
                    <div className="text-lg font-semibold text-gray-900">${item.price.toFixed(2)}</div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-gray-400 hover:text-gray-600"
                      aria-label="Remove from wishlist"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
