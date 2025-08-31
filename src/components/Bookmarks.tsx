import React from 'react';
import { Heart, Trash2, BookOpen } from 'lucide-react';
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
    if (window.confirm('Вы уверены, что хотите удалить все закладки?')) {
      setBookmarks([]);
    }
  };

  if (bookmarks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto p-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
          <Heart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Нет закладок
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Добавьте аяты в избранное, чтобы они отображались здесь
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
            <Heart className="w-8 h-8 mr-3 text-red-500" />
            Избранное
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {bookmarks.length} сохраненных аятов
          </p>
        </div>
        
        {bookmarks.length > 0 && (
          <motion.button
            onClick={clearAllBookmarks}
            className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Trash2 className="w-4 h-4 mr-2 inline" />
            Очистить все
          </motion.button>
        )}
      </div>

      {/* Bookmarks List */}
      <div className="space-y-4">
        {bookmarks.map((bookmark, index) => (
          <motion.div
            key={`${bookmark.surahNumber}-${bookmark.ayahNumber}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-red-500"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white fill-current" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">
                    {bookmark.surahName}
                  </h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Аят {bookmark.ayahNumber}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={() => onNavigateToAyah(bookmark.surahNumber, bookmark.ayahNumber)}
                  className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <BookOpen className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  onClick={() => removeBookmark(bookmark.surahNumber, bookmark.ayahNumber)}
                  className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
            
            <div className="text-right text-lg leading-relaxed mb-3 text-gray-800 dark:text-white">
              {bookmark.text}
            </div>
            
            {bookmark.translation && (
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed border-t border-gray-200 dark:border-gray-600 pt-3">
                {bookmark.translation}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};