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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="p-6 bg-gray-800 rounded-xl animate-pulse">
              <div className="h-6 mb-3 bg-gray-700 rounded"></div>
              <div className="w-3/4 h-4 mb-2 bg-gray-700 rounded"></div>
              <div className="w-1/2 h-4 bg-gray-700 rounded"></div>
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
        <h2 className="mb-4 text-3xl font-bold text-white">
          All Chapters
        </h2>
        
        <div className="relative max-w-md">
          <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            placeholder="Search chapters..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full py-3 pl-10 pr-4 text-white placeholder-gray-400 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </div>
        
        <div className="mt-2 text-sm text-gray-400">
          {filteredSurahs.length} chapters
        </div>
      </div>

      {/* Surahs Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredSurahs.map((surah, index) => (
          <motion.div
            key={surah.number}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSurahSelect(surah.number)}
            className="transition-colors bg-gray-800 border border-gray-700 cursor-pointer hover:bg-gray-750 rounded-xl group hover:border-gray-600"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full">
                    <span className="font-bold text-white">{surah.number}</span>
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-white">
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
                  <div className="mb-1 text-xs text-gray-400">
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