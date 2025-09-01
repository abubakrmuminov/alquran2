import React from 'react';
import { Heart, Trash2, BookOpen, ArrowRight, Hash } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Bookmark } from '../types/quran';

interface BookmarksProps {
  onNavigateToAyah: (surahNumber: number, ayahNumber: number) => void;
}

export const Bookmarks: React.FC<BookmarksProps> = ({ onNavigateToAyah }) => {
  const [bookmarks, setBookmarks] = useLocalStorage<Bookmark[]>('bookmarks', []);

  const removeBookmark = (surahNumber: number, ayahNumber: number) => {
    setBookmarks(prev =>
      prev.filter(b => !(b.surahNumber === surahNumber && b.ayahNumber === ayahNumber))
    );
  };

  const clearAllBookmarks = () => {
    if (window.confirm('Are you sure you want to remove all bookmarks?')) {
      setBookmarks([]);
    }
  };

  if (bookmarks.length === 0) {
    return (
      <div className="min-h-screen pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl p-6 mx-auto"
        >
          <div className="p-12 text-center glass rounded-3xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
              className="flex items-center justify-center w-20 h-20 mx-auto mb-6 text-gray-500 rounded-full bg-gray-800/50"
            >
              <Heart className="w-10 h-10" />
            </motion.div>
            <h2 className="mb-3 text-2xl font-bold text-white">
              No Bookmarks Yet
            </h2>
            <p className="text-gray-400">
              Start bookmarking your favorite verses to see them here
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl p-4 mx-auto sm:p-6"
      >
        {/* Header */}
        <div className="flex flex-col items-start justify-between mb-8 space-y-4 sm:flex-row sm:items-center sm:space-y-0">
          <div>
            <h2 className="flex items-center text-3xl font-bold text-white sm:text-4xl">
              <Heart className="w-8 h-8 mr-3 text-red-400" />
              Bookmarks
            </h2>
            <p className="mt-2 text-gray-400">
              {bookmarks.length} saved verses
            </p>
          </div>
          
          {bookmarks.length > 0 && (
            <motion.button
              onClick={clearAllBookmarks}
              className="flex items-center px-4 py-2 space-x-2 text-red-400 transition-all duration-300 rounded-xl hover:text-red-300 hover:bg-red-500/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </motion.button>
          )}
        </div>

        {/* Bookmarks List */}
        <div className="space-y-6">
          {bookmarks.map((bookmark, index) => (
            <motion.div
              key={`${bookmark.surahNumber}-${bookmark.ayahNumber}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.6,
                type: "spring",
                bounce: 0.3
              }}
              className="relative overflow-hidden transition-all duration-500 glass rounded-3xl card-hover group"
            >
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-pink-500"></div>
              
              <div className="p-6 sm:p-8">
                <div className="flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-pink-600">
                      <Heart className="w-6 h-6 text-white fill-current" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1 text-xl font-bold text-white">
                        {bookmark.surahName}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <Hash className="w-3 h-3" />
                        <span>Verse {bookmark.ayahNumber}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <motion.button
                      onClick={() => onNavigateToAyah(bookmark.surahNumber, bookmark.ayahNumber)}
                      className="flex items-center px-4 py-2 space-x-2 text-blue-400 transition-all duration-300 rounded-xl hover:text-blue-300 hover:bg-blue-500/10"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span className="hidden sm:inline">Read</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      onClick={() => removeBookmark(bookmark.surahNumber, bookmark.ayahNumber)}
                      className="p-2 text-red-400 transition-all duration-300 rounded-xl hover:text-red-300 hover:bg-red-500/10"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
                
                {/* Arabic text */}
                <div className="mt-6 mb-4 text-right">
                  <p className="leading-loose text-gray-100 font-arabic">
                    {bookmark.text}
                  </p>
                </div>
                
                {/* Translation */}
                {bookmark.translation && (
                  <div className="pt-4 border-t border-gray-700/50">
                    <p className="leading-relaxed text-gray-300">
                      {bookmark.translation}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};