import React, { useState, useEffect } from 'react';
import { Search, BookOpen, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { quranApi } from '../api/quran';
import { Pagination } from './Pagination';
import type { Surah } from '../types/quran';

interface SurahListProps {
  onSurahSelect: (surahNumber: number) => void;
}

export const SurahList: React.FC<SurahListProps> = ({ onSurahSelect }) => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const loadSurahs = async () => {
      try {
        const data = await quranApi.getSurahs();
        setSurahs(data);
      } catch (error) {
        console.error('Error loading surahs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSurahs();
  }, []);

  const filteredSurahs = surahs.filter(surah =>
    surah.englishName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    surah.englishNameTranslation.toLowerCase().includes(searchFilter.toLowerCase()) ||
    surah.number.toString().includes(searchFilter)
  );

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredSurahs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSurahs = filteredSurahs.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <div className="w-48 h-8 mb-4 bg-gray-800 rounded-lg animate-pulse"></div>
          <div className="h-12 bg-gray-800 w-80 rounded-xl animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="p-6 bg-gray-800/50 rounded-2xl animate-pulse">
              <div className="flex items-center mb-4 space-x-3">
                <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                <div className="flex-1">
                  <div className="w-24 h-5 mb-2 bg-gray-700 rounded"></div>
                  <div className="w-32 h-4 bg-gray-700 rounded"></div>
                </div>
              </div>
              <div className="w-20 h-4 bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
          All Chapters
        </h2>
        
        <div className="relative max-w-md">
          <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
          <input
            type="text"
            placeholder="Search chapters..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full py-4 pl-12 pr-4 text-white placeholder-gray-400 transition-all duration-300 border border-gray-700 glass rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        
        <motion.div 
          className="mt-3 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {filteredSurahs.length} chapters found • Page {currentPage} of {totalPages}
        </motion.div>
      </motion.div>

      {/* Surahs Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentSurahs.map((surah, index) => (
          <motion.div
            key={surah.number}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: index * 0.05,
              duration: 0.6,
              type: "spring",
              bounce: 0.3
            }}
            onClick={() => onSurahSelect(surah.number)}
            className="relative overflow-hidden transition-all duration-500 cursor-pointer glass rounded-2xl card-hover group"
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:opacity-100"></div>
            
            <div className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600">
                      <span className="text-lg font-bold text-white">{surah.number}</span>
                    </div>
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 group-hover:opacity-20 blur-md"></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1 text-xl font-bold text-white truncate">
                      {surah.name}
                    </h3>
                    <div className="text-sm font-medium text-gray-300">
                      {surah.englishName}
                    </div>
                    <div className="text-xs text-gray-400 truncate">
                      {surah.englishNameTranslation}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{surah.revelationType}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="w-3 h-3" />
                    <span>{surah.numberOfAyahs} verses</span>
                  </div>
                </div>
                
                <motion.div
                  className="p-2 text-gray-400 transition-all duration-300 rounded-lg group-hover:text-white group-hover:bg-white/10"
                  whileHover={{ scale: 1.1 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {filteredSurahs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredSurahs.length}
          />
        </motion.div>
      )}

      {/* Empty State */}
      {currentSurahs.length === 0 && !loading && filteredSurahs.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-20 text-center"
        >
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-gray-600 bg-gray-800 rounded-full">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-300">No chapters found</h3>
            <p className="text-gray-500">Try adjusting your search terms</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};
