"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

type PageItem = number | string;

const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
  const [pages, setPages] = useState<PageItem[]>([]);

  useEffect(() => {
    // Генерация массива страниц с учетом текущей страницы
    const generatePageNumbers = (): PageItem[] => {
      if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      if (currentPage <= 4) {
        return [1, 2, 3, 4, 5, "...", totalPages];
      }

      if (currentPage >= totalPages - 3) {
        return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      }

      return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
    };

    setPages(generatePageNumbers());
  }, [currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="flex justify-center items-center w-full mt-8">
      <motion.ul 
        className="flex items-center space-x-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Кнопка "Предыдущая страница" */}
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-md flex items-center justify-center 
              ${currentPage === 1 
                ? 'text-gray-500 cursor-not-allowed' 
                : 'text-blue-400 hover:bg-blue-500/10 transition-colors'}`}
            aria-label="Предыдущая страница"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
        </li>

        {/* Нумерация страниц */}
        {pages.map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span className="px-3 py-1.5 text-gray-500">...</span>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(page as number)}
                className={`px-3 py-1.5 rounded-md font-medium
                  ${currentPage === page
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'text-gray-300 hover:bg-white/5 dark:hover:bg-white/10'}`}
              >
                {page}
              </motion.button>
            )}
          </li>
        ))}

        {/* Кнопка "Следующая страница" */}
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-md flex items-center justify-center 
              ${currentPage === totalPages 
                ? 'text-gray-500 cursor-not-allowed' 
                : 'text-blue-400 hover:bg-blue-500/10 transition-colors'}`}
            aria-label="Следующая страница"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </li>
      </motion.ul>
    </nav>
  );
};

export default Pagination; 