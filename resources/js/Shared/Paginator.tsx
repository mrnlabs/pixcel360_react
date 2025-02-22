import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginatorProps {
  /** Total number of items to paginate */
  totalItems: number;
  /** Number of items to display per page */
  itemsPerPage?: number;
  /** Current active page number */
  currentPage: number;
  /** Callback function when page changes */
  onPageChange: (page: number) => void;
  /** Custom text for the "Showing X-Y of Z Entries" message */
  showingText?: string;
  /** Additional CSS classes */
  className?: string;
  /** Maximum number of visible page buttons */
  maxVisiblePages?: number;
}

const Paginator: React.FC<PaginatorProps> = ({
  totalItems,
  itemsPerPage = 10,
  currentPage,
  onPageChange,
  showingText = "Showing",
  className = "",
  maxVisiblePages = 5
}) => {
  const totalPages: number = Math.ceil(totalItems / itemsPerPage);
  const startItem: number = ((currentPage - 1) * itemsPerPage) + 1;
  const endItem: number = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    // Calculate center pages
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className={`flex flex-wrap items-center ${className}`}>
      <div className="text-sm text-gray-600">
        {`${showingText} ${startItem}-${endItem} of ${totalItems} Entries`}
      </div>
      
      <div className="ml-auto">
        <nav aria-label="Page navigation" className="pagination-style-4">
          <ul className="flex flex-wrap items-center gap-1">
            
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center px-3 py-2 text-sm font-medium border rounded-sm transition-colors
                  ${currentPage === 1 
                    ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400' 
                    : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
                  }`}
                aria-label="Previous page"
              >
                {/* <ChevronLeft className="w-4 h-4" /> */}
                <span className="ml-1">Prev</span>
              </button>
            </li>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) => (
              <li key={`page-${index}`} className="page-item">
                {page === '...' ? (
                  <span className="px-3 py-2 text-sm text-gray-700">...</span>
                ) : (
                  <button
                    onClick={() => handlePageChange(page as number)}
                    className={`px-3 py-2 text-sm font-medium rounded-sm transition-colors
                      ${currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    aria-label={`Page ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </button>
                )}
              </li>
            ))}

           
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center px-3 py-1 text-sm font-medium border rounded-sm transition-colors
                  ${currentPage === totalPages 
                    ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400' 
                    : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
                  }`}
                aria-label="Next page"
              >
                <span className="mr-1">Next</span>
                {/* <ChevronRight className="w-4 h-4" /> */}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Paginator;