import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { quranApi } from '../api/quran';
import type { Surah } from '../types/quran';

interface SurahListProps {
  onSurahSelect: (surahNumber: number) => void;
}

export const SurahList: React.FC<SurahListProps> = ({ onSurahSelect }) => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');

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

  if (loading) {
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-xl p-6 animate-pulse">
              <div className="h-6 bg-gray-700 rounded mb-3"></div>
              <div className="h-4 bg-gray-700 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-4">
          All Chapters
        </h2>
        
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search chapters..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="bg-gray-800 text-white placeholder-gray-400 pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none w-full"
          />
        </div>
        
        <div className="text-gray-400 text-sm mt-2">
          {filteredSurahs.length} chapters
        </div>
      </div>

      {/* Surahs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSurahs.map((surah, index) => (
          <motion.div
            key={surah.number}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSurahSelect(surah.number)}
            className="bg-gray-800 hover:bg-gray-750 rounded-xl cursor-pointer group transition-colors border border-gray-700 hover:border-gray-600"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{surah.number}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      {surah.name}
                    </h3>
                    <div className="text-sm text-gray-400">
                      {surah.englishName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {surah.englishNameTranslation}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-xs text-gray-400 mb-1">
                    {surah.revelationType === 'Meccan' ? 'Medinan' : 'Medinan'}
                  </div>
                  <div className="text-sm text-gray-300">
                    {surah.numberOfAyahs} verses
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};