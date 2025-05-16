import React from 'react';
import Navbar from '../components/Navbar';
import Breadcrumb from '../components/Breadcrumb';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { toast } from '@/hooks/use-toast';

const Cart = () => {
  const { cartItems, removeFromCart } = useStore();

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Cart' },
  ];

  const handleRemoveItem = (id) => {
    removeFromCart(id);
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-xl font-semibold mb-6">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Your cart is empty.</p>
              <Link to="/" className="text-brand-blue hover:underline">
                Continue shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="divide-y">
                {cartItems.map((item) => (
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
                      <div className="text-sm text-gray-500 mb-1">
                        Quantity: {item.quantity || 1}
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-gray-400 hover:text-gray-600"
                        aria-label="Remove from cart"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-right">
                <h2 className="text-lg font-semibold text-gray-800">
                  Total: ${calculateTotal().toFixed(2)}
                </h2>
                <Link
                  to="/checkout"
                  className="inline-block mt-4 bg-brand-blue text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
