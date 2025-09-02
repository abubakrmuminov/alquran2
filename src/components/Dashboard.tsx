import React, { useState, useEffect } from 'react';
import { Search, Bookmark, Star, ArrowRight } from 'lucide-react';
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
  const [lastRead] = useLocalStorage<LastRead | null>('lastRead', null);

  return (
    <div className="min-h-screen pt-16">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl -top-48 -left-48 float"></div>
        <div className="absolute rounded-full w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl top-1/3 -right-40 float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl bottom-1/4 left-1/4 float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Hero Section */}
      <div className="relative z-10 px-4 py-20 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            className="mb-6 text-5xl font-bold gradient-text sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Quran Reader
          </motion.h1>
          
         <motion.p
  className="max-w-2xl mx-auto mb-12 text-lg text-gray-300 sm:text-xl"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4, duration: 0.8 }}
>
  Dive into the beauty of the Holy Quran — clear recitations, thoughtful translations, 
  and a calm design that helps you connect with every verse.
  <br />
  <span className="block mt-4 text-sm text-gray-400">
    Visit my Telegram channel to stay updated and receive daily inspiring posts: 
    <a href="https://t.me/ТвойКанал" target="_blank" className="underline hover:text-white">t.me/ТвойКанал</a>
  </span>
</motion.p>
          
          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.button 
              className="flex items-center px-8 py-4 space-x-3 text-white transition-all duration-300 rounded-2xl btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-5 h-5" />
              <span className="font-medium">Search Quran</span>
            </motion.button>
            
            <motion.button 
              className="flex items-center px-8 py-4 space-x-3 text-gray-300 transition-all duration-300 glass rounded-2xl hover:text-white hover:bg-white/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bookmark className="w-5 h-5" />
              <span className="font-medium">My Bookmarks</span>
            </motion.button>
          </motion.div>

          {/* Last Read Section */}
          {lastRead && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="max-w-md mx-auto mt-12"
            >
              <div className="p-6 glass rounded-2xl">
                <div className="flex items-center mb-3 space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-300">Continue Reading</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {lastRead.surahName}
                </h3>
                <p className="mb-4 text-sm text-gray-400">
                  Ayah {lastRead.ayahNumber}
                </p>
                <motion.button
                  onClick={() => onNavigateToSurah(lastRead.surahNumber, lastRead.ayahNumber)}
                  className="flex items-center justify-center w-full px-4 py-3 space-x-2 text-white transition-all duration-300 rounded-xl btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* All Chapters Section */}
      <div className="relative z-10 px-4 pb-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <SurahList onSurahSelect={onNavigateToSurah} />
        </motion.div>
      </div>
    </div>
  );
};