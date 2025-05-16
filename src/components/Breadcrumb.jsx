
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && <ChevronRight size={16} className="text-gray-400 mx-1" />}
            
            {index === items.length - 1 ? (
              <span className="text-gray-500 font-medium">{item.name}</span>
            ) : (
              <Link
                to={item.href}
                className="text-brand-blue hover:text-brand-dark-blue hover:underline"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
