
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Breadcrumb from '../components/Breadcrumb';
import { Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { toast } from '@/hooks/use-toast';

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [description, setDescription] = useState('');
  const [variants, setVariants] = useState([
    { ram: '', price: '', qty: 1 }
  ]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  
  const { categories, addProduct } = useStore();
  const navigate = useNavigate();
  
  // Flatten subcategories from all categories
  const subCategories = categories.reduce((acc, category) => {
    return [...acc, ...category.subcategories.map(sub => ({
      ...sub,
      categoryName: category.name
    }))];
  }, []);
  
  const handleAddVariant = () => {
    setVariants([...variants, { ram: '', price: '', qty: 1 }]);
  };
  
  const handleRemoveVariant = (index) => {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
  };
  
  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };
  
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
      setSelectedImages([...selectedImages, ...files]);
      
      const newPreviewUrls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    }
  };
  
  const removeImage = (index) => {
    const newSelectedImages = [...selectedImages];
    const newPreviewUrls = [...previewUrls];
    
    newSelectedImages.splice(index, 1);
    
    URL.revokeObjectURL(newPreviewUrls[index]);
    newPreviewUrls.splice(index, 1);
    
    setSelectedImages(newSelectedImages);
    setPreviewUrls(newPreviewUrls);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Product title cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedSubCategory) {
      toast({
        title: "Error",
        description: "Please select a subcategory",
        variant: "destructive"
      });
      return;
    }
    
    if (variants.some(variant => !variant.ram.trim() || !variant.price.trim())) {
      toast({
        title: "Error",
        description: "All variant fields must be filled",
        variant: "destructive"
      });
      return;
    }
    
    const formData = {
      title,
      subCategoryId: selectedSubCategory,
      description,
      variants,
      imageUrls: previewUrls
    };
    
    console.log('Product data to save:', formData);
    
    // Add product
    addProduct(formData);
    
    // Show success toast
    toast({
      title: "Success",
      description: `Product "${title}" has been added successfully.`
    });
    
    // Reset form or navigate
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };
  
  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Add Product' },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-xl font-bold mb-6 text-center">Add Product</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Title:</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Variants:</label>
              {variants.map((variant, index) => (
                <div key={index} className="flex items-center gap-3 mb-3">
                  <div className="w-1/3">
                    <input
                      type="text"
                      placeholder="Ram"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      value={variant.ram}
                      onChange={(e) => handleVariantChange(index, 'ram', e.target.value)}
                      required
                    />
                  </div>
                  <div className="w-1/3">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Price"
                        className="w-full px-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        value={variant.price}
                        onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="w-1/4">
                    <div className="flex">
                      <button 
                        type="button"
                        onClick={() => handleVariantChange(index, 'qty', Math.max(1, variant.qty - 1))}
                        className="border border-gray-300 rounded-l-md px-3 py-2 hover:bg-gray-100"
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={variant.qty}
                        onChange={(e) => handleVariantChange(index, 'qty', parseInt(e.target.value) || 1)}
                        className="border-t border-b border-gray-300 px-3 py-2 w-12 text-center focus:outline-none"
                      />
                      <button 
                        type="button"
                        onClick={() => handleVariantChange(index, 'qty', variant.qty + 1)}
                        className="border border-gray-300 rounded-r-md px-3 py-2 hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  {variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddVariant}
                className="text-brand-blue underline hover:text-brand-dark-blue mt-2"
              >
                Add variant
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Sub category:</label>
              <div className="select-wrapper">
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue appearance-none"
                  value={selectedSubCategory}
                  onChange={(e) => setSelectedSubCategory(e.target.value)}
                  required
                >
                  <option value="" disabled>Select sub category</option>
                  {subCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.categoryName} - {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Description:</label>
              <textarea
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Upload Image:</label>
              <div className="flex items-center flex-wrap gap-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative border rounded-md h-24 w-24">
                    <img 
                      src={url} 
                      alt={`Preview ${index + 1}`} 
                      className="h-full w-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-white rounded-full w-5 h-5 flex items-center justify-center shadow-md text-red-500"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                
                <label className="border border-dashed border-gray-300 rounded-md h-24 w-24 flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    multiple
                    onChange={handleImageChange}
                  />
                </label>
              </div>
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

export default AddProduct;
