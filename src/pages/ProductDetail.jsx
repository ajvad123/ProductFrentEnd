
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Breadcrumb from '../components/Breadcrumb';
import StarRating from '../components/StarRating';
import { Heart, Check, Minus, Plus } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedRam, setSelectedRam] = useState('4 GB');
  
  // Mock product data
  const product = {
    id,
    title: 'HP AMD Ryzen 3',
    price: 529.99,
    rating: 5,
    availability: 'In stock',
    stockCount: 24,
    description: 'The Ryzen 7 is a more high-end processor that compares to the Intel Core i7 series.',
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=800&auto=format&fit=crop',
    ],
    ramOptions: ['4 GB', '8 GB', '16 GB'],
  };
  
  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Product details' },
  ];
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
              <div className="border rounded-lg p-4 flex items-center justify-center h-96 mb-4">
                <img 
                  src={product.images[0]} 
                  alt={product.title} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {product.images.map((img, index) => (
                  <div key={index} className="border rounded-lg p-2 flex items-center justify-center h-24">
                    <img 
                      src={img} 
                      alt={`${product.title} - ${index + 1}`} 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">{product.title}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <StarRating rating={product.rating} />
              </div>
              
              <div className="text-3xl font-bold text-gray-900 mb-6">${product.price.toFixed(2)}</div>
              
              <div className="flex items-center gap-2 mb-6">
                <span className="text-gray-700 font-medium">Availability:</span>
                <div className="flex items-center gap-1">
                  <Check size={16} className="text-green-500" />
                  <span className="text-green-500">{product.availability}</span>
                </div>
                <span className="text-gray-600">
                  (Hurry up! only {product.stockCount} product left in stock!)
                </span>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Ram:</h3>
                <div className="flex gap-3">
                  {product.ramOptions.map(ram => (
                    <button
                      key={ram}
                      onClick={() => setSelectedRam(ram)}
                      className={`px-4 py-2 rounded-md border ${
                        selectedRam === ram 
                          ? 'border-brand-blue bg-brand-light-blue text-brand-blue' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {ram}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-2">Quantity:</h3>
                <div className="flex items-center">
                  <button 
                    onClick={decrementQuantity}
                    className="border border-gray-300 rounded-l-md px-3 py-2 hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="border-t border-b border-gray-300 px-3 py-2 w-16 text-center focus:outline-none"
                  />
                  <button 
                    onClick={incrementQuantity}
                    className="border border-gray-300 rounded-r-md px-3 py-2 hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button 
                  className="bg-brand-orange text-white px-6 py-3 rounded-md hover:bg-amber-500 transition-colors"
                >
                  Edit product
                </button>
                <button 
                  className="bg-brand-orange text-white px-6 py-3 rounded-md hover:bg-amber-500 transition-colors"
                >
                  Buy it now
                </button>
                <button 
                  className="border border-gray-300 px-3 py-3 rounded-md hover:bg-gray-50 transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
