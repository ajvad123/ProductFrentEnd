
import React from 'react';
import { ChevronRight } from 'lucide-react';

const CategorySidebar = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="font-medium text-lg mb-4">Categories</h2>
      
      <ul className="space-y-1">
        <li>
          <button
            className={`w-full text-left py-2 px-3 rounded-md ${
              !selectedCategory ? 'bg-brand-light-blue text-brand-blue font-medium' : 'hover:bg-gray-100'
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            All categories
          </button>
        </li>
        
        {categories.map(category => (
          <li key={category.id}>
            <button
              className={`w-full text-left py-2 px-3 rounded-md flex items-center justify-between ${
                selectedCategory === category.id ? 'bg-brand-light-blue text-brand-blue font-medium' : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="flex items-center gap-2">
                {category.icon && <category.icon size={18} />}
                <span>{category.name}</span>
              </div>
              {category.subcategories?.length > 0 && (
                <ChevronRight size={16} className="text-gray-400" />
              )}
            </button>
            
            {category.subcategories?.length > 0 && selectedCategory === category.id && (
              <ul className="ml-6 mt-1 space-y-1">
                {category.subcategories.map(subcategory => (
                  <li key={subcategory.id}>
                    <button
                      className="w-full text-left py-1 px-3 rounded-md hover:bg-gray-100 flex items-center gap-2"
                      onClick={() => console.log('Selected subcategory:', subcategory.name)}
                    >
                      {subcategory.icon && <subcategory.icon size={14} />}
                      <span>{subcategory.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
