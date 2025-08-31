import React, { useRef, useEffect } from "react";
import { Bookmark as BookmarkIcon, Play, Volume2 } from "lucide-react";

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

  // 🔥 автоскролл
  useEffect(() => {
    if (isThisPlaying && cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isThisPlaying]);

  return (
    <div
      ref={cardRef}
      className={`p-4 rounded-2xl shadow transition-colors ${
        isThisPlaying
          ? "bg-green-50 border-l-4 border-green-500 dark:bg-green-900/30"
          : "bg-white dark:bg-gray-800"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-2xl leading-loose text-right font-arabic">
            {ayah.text}
          </p>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            {translation.text}
          </p>
          {isThisPlaying && (
            <p className="flex items-center gap-1 mt-2 text-sm text-green-600 dark:text-green-400">
              <Volume2 className="w-4 h-4" /> ▶ Сейчас играет
            </p>
          )}
        </div>

        <div className="flex flex-col items-end gap-2">
          <button
            onClick={() =>
              onToggleBookmark({
                surahNumber,
                ayahNumber: ayah.numberInSurah,
                surahName,
              })
            }
            className={`p-2 rounded-full ${
              isBookmarked
                ? "text-yellow-500"
                : "text-gray-400 hover:text-yellow-500"
            }`}
          >
            <BookmarkIcon className="w-5 h-5" />
          </button>

          <button
            onClick={onPlay}
            className="p-2 text-gray-500 rounded-full hover:text-green-600"
          >
            <Play className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
