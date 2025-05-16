
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PaginationNav = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  
  return (
    <nav className="flex items-center justify-center mt-8">
      <ul className="flex items-center gap-1">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 
              disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            <ChevronLeft size={16} />
          </button>
        </li>
        
        {startPage > 1 && (
          <>
            <li>
              <button
                onClick={() => onPageChange(1)}
                className="flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 hover:bg-gray-100"
              >
                1
              </button>
            </li>
            {startPage > 2 && (
              <li className="px-1">...</li>
            )}
          </>
        )}
        
        {pages.map(page => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`flex items-center justify-center w-8 h-8 rounded-md
                ${
                  currentPage === page
                    ? 'bg-brand-orange text-white'
                    : 'border border-gray-300 hover:bg-gray-100'
                }`}
            >
              {page}
            </button>
          </li>
        ))}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <li className="px-1">...</li>
            )}
            <li>
              <button
                onClick={() => onPageChange(totalPages)}
                className="flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 hover:bg-gray-100"
              >
                {totalPages}
              </button>
            </li>
          </>
        )}
        
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 
              disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            <ChevronRight size={16} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationNav;
