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
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-32 h-32 rotate-45 border border-gray-600 top-20 left-20"></div>
        <div className="absolute w-24 h-24 border border-gray-600 top-40 right-32 rotate-12"></div>
        <div className="absolute w-40 h-40 border border-gray-600 bottom-32 left-1/4 -rotate-12"></div>
        <div className="absolute rotate-45 border border-gray-600 bottom-20 right-20 w-28 h-28"></div>
        <div className="absolute w-64 h-64 transform -translate-x-1/2 -translate-y-1/2 border border-gray-600 top-1/2 left-1/2 rotate-12"></div>
      </div>
      
      {/* Hero Section */}
      <div className="relative z-10 py-20 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-6xl font-bold text-white"
        >
          Quran Reader
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl px-6 mx-auto mb-12 text-xl text-gray-300"
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
          <button className="flex items-center px-6 py-3 space-x-2 text-white transition-colors bg-gray-800 rounded-lg hover:bg-gray-700">
            <Search className="w-5 h-5" />
            <span>Search Quran</span>
          </button>
          <button className="flex items-center px-6 py-3 space-x-2 text-white transition-colors bg-gray-800 rounded-lg hover:bg-gray-700">
            <Bookmark className="w-5 h-5" />
            <span>Bookmarks</span>
          </button>
        </motion.div>
      </div>
      
      {/* All Chapters Section */}
      <div className="relative z-10 px-6 pb-20 mx-auto max-w-7xl">
        <SurahList onSurahSelect={onNavigateToSurah} />
      </div>
    </div>
  );
};