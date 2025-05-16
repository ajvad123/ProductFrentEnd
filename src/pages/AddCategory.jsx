
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Breadcrumb from '../components/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { toast } from '@/hooks/use-toast';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const { addCategory } = useStore();
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Adding category:', categoryName);

    
    // Add validation
    if (!categoryName.trim()) {
      toast({
        title: "Error",
        description: "Category name cannot be empty.",
        variant: "destructive"
      });
      return;
    }
    
    // Add category
    const newCategory = addCategory(categoryName);
    
    // Show success toast
    toast({
      title: "Success",
      description: `Category "${categoryName}" has been added successfully.`
    });
    
    // Reset form
    setCategoryName('');
    
    // Navigate back to homepage
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };
  
  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Add Category' },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-xl font-bold mb-6 text-center">Add Category</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Enter category name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </div>
            
            <div className="flex justify-center gap-4">
              <button
                type="submit"
                className="bg-brand-orange text-white px-6 py-2 rounded-md hover:bg-amber-500 transition-colors"
              >
                ADD
              </button>
              <button
                type="button"
                onClick={() => setCategoryName('')}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                DISCARD
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
