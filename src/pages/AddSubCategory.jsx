import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Breadcrumb from '../components/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { toast } from '@/hooks/use-toast';

const AddSubCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');

  const { categories, addSubCategory } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!subCategoryName.trim()) {
      toast({
        title: 'Error',
        description: 'Subcategory name cannot be empty.',
        variant: 'destructive',
      });
      return;
    }

    if (!selectedCategory) {
      toast({
        title: 'Error',
        description: 'Please select a parent category.',
        variant: 'destructive',
      });
      return;
    }

    addSubCategory(selectedCategory, subCategoryName);

    toast({
      title: 'Success',
      description: `Subcategory "${subCategoryName}" has been added successfully.`,
    });

    setSubCategoryName('');
    setSelectedCategory('');

    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const breadcrumbItems = [
    { name: 'Home', href: '/home' },
    { name: 'Add Sub Category' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-xl font-bold mb-6 text-center">Add Sub Category</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <input
                type="text"
                placeholder="Enter sub category name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                value={subCategoryName}
                onChange={(e) => setSubCategoryName(e.target.value)}
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
                onClick={() => {
                  setSelectedCategory('');
                  setSubCategoryName('');
                }}
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

export default AddSubCategory;
