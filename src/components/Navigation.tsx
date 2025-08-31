import React, { useState } from 'react';
import { Settings, Moon, Sun, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  currentPage, 
  onPageChange, 
  isDark, 
  onToggleTheme 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Home' },
    { id: 'search', label: 'Search' },
    { id: 'bookmarks', label: 'Bookmarks' },
  ];

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Лого */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Q</span>
            </div>
            <h1 className="text-xl font-bold text-white">
              Quran Reader
            </h1>
          </div>

          {/* Десктопное меню */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                </motion.button>
              );
            })}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={onToggleTheme}
              className="p-2 text-gray-400 hover:text-white"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button 
              onClick={() => onPageChange('settings')}
              className="p-2 text-gray-400 hover:text-white"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* Бургер (мобилка) */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-gray-400 hover:text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-gray-800 border-t border-gray-700"
          >
            <div className="flex flex-col space-y-4 p-4">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onPageChange(item.id);
                      setIsOpen(false);
                    }}
                    className={`text-sm font-medium text-left ${
                      isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              <button 
                onClick={() => {
                  onToggleTheme();
                  setIsOpen(false);
                }}
                className="flex items-center space-x-2 text-gray-400 hover:text-white"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span>Toggle Theme</span>
              </button>

              <button 
                onClick={() => {
                  onPageChange('settings');
                  setIsOpen(false);
                }}
                className="flex items-center space-x-2 text-gray-400 hover:text-white"
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};