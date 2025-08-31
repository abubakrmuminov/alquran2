import React, { useState, useEffect } from 'react';
import { Search, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { quranApi } from '../api/quran';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { SurahList } from './SurahList';
import type { LastRead, Settings } from '../types/quran';

interface DashboardProps {
  onNavigateToSurah: (surahNumber: number, ayahNumber?: number) => void;
  settings: Settings;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigateToSurah, settings }) => {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-gray-600 rotate-45"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-gray-600 rotate-12"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 border border-gray-600 -rotate-12"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 border border-gray-600 rotate-45"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-gray-600 rotate-12"></div>
      </div>
      
      {/* Hero Section */}
      <div className="relative z-10 text-center py-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold text-white mb-6"
        >
          Quran Reader
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto px-6"
        >
          Read, listen, and reflect on the Holy Quran with beautiful modern design,
          multiple translations, and high-quality audio recitations
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center space-x-4"
        >
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
            <Search className="w-5 h-5" />
            <span>Search Quran</span>
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
            <Bookmark className="w-5 h-5" />
            <span>Bookmarks</span>
          </button>
        </motion.div>
      </div>
      
      {/* All Chapters Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <SurahList onSurahSelect={onNavigateToSurah} />
      </div>
    </div>
  );
};