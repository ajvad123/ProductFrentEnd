
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CategorySidebar from '../components/CategorySidebar';
import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';
import ActionButtons from '../components/ActionButtons';
import PaginationNav from '../components/PaginationNav';
import { useStore } from '../context/StoreContext';

const breadcrumbItems = [
  { name: 'Home', href: '/' },
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const { categories, products } = useStore();
  
  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter(product => {
        // Find the category with subcategories containing the product's subCategoryId
        const category = categories.find(cat => 
          cat.subcategories.some(sub => sub.id === product.subCategoryId)
        );
        return category?.id === selectedCategory;
      })
    : products;
  
  // Pagination
  const itemsPerPage = 12;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex items-center justify-between mb-6">
          <Breadcrumb items={breadcrumbItems} />
          <ActionButtons type="home" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <CategorySidebar 
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          
          <div className="lg:col-span-3">
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 mb-4">No products found.</p>
                <p className="text-brand-blue">Try adding some products or selecting a different category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {paginatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
            
            {totalPages > 1 && (
              <PaginationNav 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
