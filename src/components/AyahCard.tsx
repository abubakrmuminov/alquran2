import React, { useRef, useEffect } from "react";
import { Bookmark as BookmarkIcon, Play, Volume2, Hash } from "lucide-react";
import { motion } from "framer-motion";

interface AyahCardProps {
  ayah: any;
  translation: any;
  surahNumber: number;
  surahName: string;
  settings: any;
  isBookmarked: boolean;
  onToggleBookmark: (bookmark: any) => void;
  currentAyah: number | null;
  onPlay: () => void;
}

export const AyahCard: React.FC<AyahCardProps> = ({
  ayah,
  translation,
  surahNumber,
  surahName,
  isBookmarked,
  onToggleBookmark,
  currentAyah,
  onPlay,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const isThisPlaying = currentAyah === ayah.number;

  // Auto-scroll to playing ayah
  useEffect(() => {
    if (isThisPlaying && cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isThisPlaying]);

  return (
    <motion.div
      ref={cardRef}
      id={`ayah-${ayah.numberInSurah}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden transition-all duration-500 glass rounded-3xl card-hover ${
        isThisPlaying
          ? "ring-2 ring-blue-500/50 bg-gradient-to-br from-blue-500/10 to-purple-500/10"
          : ""
      }`}
    >
      {/* Playing indicator */}
      {isThisPlaying && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
      )}

      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between mb-6">
          {/* Ayah number */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
              isThisPlaying 
                ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
                : 'bg-gray-700/50 text-gray-300'
            }`}>
              <span className="text-sm font-bold">{ayah.numberInSurah}</span>
            </div>
            {isThisPlaying && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2 text-blue-400"
              >
                <Volume2 className="w-4 h-4" />
                <span className="text-sm font-medium">Now Playing</span>
              </motion.div>
            )}
          </motion.div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={() =>
                onToggleBookmark({
                  surahNumber,
                  ayahNumber: ayah.numberInSurah,
                  surahName,
                  text: ayah.text,
                  translation: translation.text,
                })
              }
              className={`p-3 rounded-xl transition-all duration-300 ${
                isBookmarked
                  ? "text-yellow-400 bg-yellow-500/20 hover:bg-yellow-500/30"
                  : "text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10"
              }`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <BookmarkIcon className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </motion.button>

            <motion.button
              onClick={onPlay}
              className={`p-3 rounded-xl transition-all duration-300 ${
                isThisPlaying
                  ? "text-blue-400 bg-blue-500/20 hover:bg-blue-500/30"
                  : "text-gray-400 hover:text-blue-400 hover:bg-blue-500/10"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Play className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Arabic text */}
        <div className="mb-6 text-right">
          <p className="leading-loose font-arabic">
            {ayah.text}
          </p>
        </div>

        {/* Translation */}
        <div className="pt-4 border-t border-gray-700/50">
          <p className="leading-relaxed text-gray-300">
            {translation.text}
          </p>
        </div>

        {/* Ayah metadata */}
        <div className="flex items-center justify-between pt-4 mt-4 text-xs text-gray-500 border-t border-gray-700/30">
          <div className="flex items-center space-x-4">
            <span>Juz {ayah.juz}</span>
            <span>Page {ayah.page}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Hash className="w-3 h-3" />
            <span>{ayah.number}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};