/**
 * Enhanced Pagination Controls Component
 * Provides navigation controls for paginated content
 * Improved to handle large datasets and prevent UI cutoff
 */
const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  // Generate an array of page numbers to display
  const getPageNumbers = () => {
    // For very large datasets, we need a more sophisticated approach
    const pages = new Set();
    
    // Always add first and last page
    pages.add(1);
    if (totalPages > 1) {
      pages.add(totalPages);
    }
    
    // Add current page
    pages.add(currentPage);
    
    // For large page counts, add more context around current page
    // and add more pages when near the beginning or end
    if (totalPages <= 7) {
      // For smaller page counts, show all pages
      for (let i = 2; i < totalPages; i++) {
        pages.add(i);
      }
    } else {
      // For large page counts, show more context
      
      // Always add page 2 if total pages > 7
      if (totalPages > 7) {
        pages.add(2);
      }
      
      // Add pages around current page
      for (let i = Math.max(3, currentPage - 2); i <= Math.min(totalPages - 2, currentPage + 2); i++) {
        pages.add(i);
      }
      
      // Add the page before the last page if we have many pages
      if (totalPages > 7) {
        pages.add(totalPages - 1);
      }
    }
    
    // Convert to sorted array
    return Array.from(pages).sort((a, b) => a - b);
  };

  // For direct page input
  const [inputPage, setInputPage] = useState('');
  
  const handlePageInput = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setInputPage(value);
    }
  };
  
  const handlePageInputSubmit = (e) => {
    e.preventDefault();
    const page = parseInt(inputPage);
    if (page && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
    setInputPage('');
  };

  // No pagination needed for single page
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination-container py-6 mb-16">
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Page information display */}
        <div className="text-sm text-gray-600 mb-2">
          Page {currentPage} of {totalPages}
        </div>
        
        <div className="flex items-center justify-center space-x-2">
          {/* Previous button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
            className={`px-3 py-1 rounded ${
              currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-black/70'
            }`}
          >
            &lt;
          </button>
          
          {/* Page numbers */}
          {pageNumbers.map((pageNumber, index) => {
            // Add ellipsis when there are gaps between page numbers
            const showEllipsisBefore = index > 0 && pageNumber > pageNumbers[index - 1] + 1;
            
            return (
              <div key={pageNumber} className="flex items-center">
                {showEllipsisBefore && <span className="px-1 text-gray-500">...</span>}
                
                <button
                  onClick={() => onPageChange(pageNumber)}
                  aria-label={`Go to page ${pageNumber}`}
                  aria-current={currentPage === pageNumber ? 'page' : undefined}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentPage === pageNumber
                      ? 'bg-black text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {pageNumber}
                </button>
              </div>
            );
          })}
          
          {/* Next button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
            className={`px-3 py-1 rounded ${
              currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-black/70'
            }`}
          >
            &gt;
          </button>
        </div>
        
        {/* Go to page form - only show for large page counts */}
        {totalPages > 10 && (
          <form onSubmit={handlePageInputSubmit} className="mt-2 flex items-center space-x-2">
            <label htmlFor="page-input" className="text-sm text-gray-600">Go to page:</label>
            <input
              id="page-input"
              type="text"
              value={inputPage}
              onChange={handlePageInput}
              className="w-16 h-8 border rounded text-center"
              aria-label="Go to page number"
            />
            <button
              type="submit"
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
            >
              Go
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

import { useState } from 'react';
export default PaginationControls;
