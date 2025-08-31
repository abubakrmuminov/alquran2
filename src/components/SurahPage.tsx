import React, { useState, useEffect } from "react";
import { ArrowLeft, Book } from "lucide-react";
import { motion } from "framer-motion";
import { AyahCard } from "./AyahCard";
import { quranApi } from "../api/quran";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Bookmark, Settings, LastRead } from "../types/quran";

interface SurahPageProps {
  surahNumber: number;
  onBack: () => void;
  settings: Settings;
}

export const SurahPage: React.FC<SurahPageProps> = ({
  surahNumber,
  onBack,
  settings,
}) => {
  const [surahData, setSurahData] = useState<any>(null);
  const [translationData, setTranslationData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useLocalStorage<Bookmark[]>("bookmarks", []);
  const [, setLastRead] = useLocalStorage<LastRead | null>("lastRead", null);

  // 🎵 текущее воспроизведение
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [currentAyah, setCurrentAyah] = useState<number | null>(null);

  // Загружаем суру
  useEffect(() => {
    const loadSurah = async () => {
      setLoading(true);
      try {
        const [arabicData, translationData] = await Promise.all([
          quranApi.getSurah(surahNumber),
          quranApi.getSurahWithTranslation(surahNumber, settings.translation),
        ]);
        setSurahData(arabicData);
        setTranslationData(translationData);
      } catch (error) {
        console.error("Error loading surah:", error);
      } finally {
        setLoading(false);
      }
    };
    loadSurah();
  }, [surahNumber, settings.translation]);

  // Запоминаем последнюю прочитанную суру
  useEffect(() => {
    if (surahData) {
      setLastRead({
        surahNumber,
        ayahNumber: 1,
        surahName: surahData.englishName,
        timestamp: Date.now(),
      });
    }
  }, [surahData, surahNumber, setLastRead]);

  // ⭐ воспроизведение аята с автоплеем
  const playAyah = async (ayahIndex: number) => {
    try {
      if (currentAudio) {
        currentAudio.pause();
        setCurrentAudio(null);
      }

      const ayah = surahData.ayahs[ayahIndex];
      const audioData = await quranApi.getAyahAudio(
        surahNumber,
        ayah.numberInSurah,
        settings.reciter
      );

      if (audioData.audio) {
        const audio = new Audio(audioData.audio);
        setCurrentAudio(audio);
        setCurrentAyah(ayah.number);

        audio.onended = () => {
          const nextIndex = ayahIndex + 1;
          if (nextIndex < surahData.ayahs.length) {
            playAyah(nextIndex);
          } else {
            setCurrentAudio(null);
            setCurrentAyah(null);
          }
        };

        await audio.play();
      }
    } catch (err) {
      console.error("Ошибка воспроизведения:", err);
      setCurrentAudio(null);
      setCurrentAyah(null);
    }
  };

  // 🛑 остановка всего
  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
      setCurrentAyah(null);
    }
  };

  const handleToggleBookmark = (bookmark: Bookmark) => {
    setBookmarks((prev) => {
      const isBookmarked = prev.some(
        (b) =>
          b.surahNumber === bookmark.surahNumber &&
          b.ayahNumber === bookmark.ayahNumber
      );
      return isBookmarked
        ? prev.filter(
            (b) =>
              !(
                b.surahNumber === bookmark.surahNumber &&
                b.ayahNumber === bookmark.ayahNumber
              )
          )
        : [...prev, bookmark];
    });
  };

  const isBookmarked = (ayahNumber: number) =>
    bookmarks.some(
      (b) => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber
    );

  if (loading) {
    return <p className="p-6 text-center">Загрузка...</p>;
  }

  if (!surahData || !translationData) {
    return (
      <div className="p-6 text-center">
        <p className="mb-4 text-red-500">Ошибка загрузки суры</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-300"
        >
          Назад
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-4xl p-6 mx-auto"
    >
      {/* Header */}
      <div className="p-6 mb-6 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
        <div className="flex items-center justify-between">
          <motion.button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 transition-colors dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Назад к сурам</span>
          </motion.button>

          {currentAudio && (
            <motion.button
              onClick={stopAudio}
              className="flex items-center px-3 py-2 space-x-2 text-red-600 transition-colors bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>⏹ Остановить всё</span>
            </motion.button>
          )}
        </div>

        <div className="mt-4 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-800 dark:text-white">
            {surahData.name}
          </h1>
          <div className="text-lg text-gray-600 dark:text-gray-400">
            {surahData.englishName} - {surahData.englishNameTranslation}
          </div>
          <div className="flex items-center justify-center mt-2 text-sm text-gray-600 dark:text-gray-400">
            <Book className="w-4 h-4 mr-2" />
            <span>{surahData.numberOfAyahs} аятов</span>
          </div>
        </div>
      </div>

      {/* Все аяты */}
      <div className="space-y-6">
        {surahData.ayahs.map((ayah: any, index: number) => (
          <AyahCard
            key={ayah.number}
            ayah={ayah}
            translation={translationData.ayahs[index]}
            surahNumber={surahNumber}
            surahName={surahData.englishName}
            settings={settings}
            isBookmarked={isBookmarked(ayah.numberInSurah)}
            onToggleBookmark={handleToggleBookmark}
            currentAyah={currentAyah}
            onPlay={() => playAyah(index)}
          />
        ))}
      </div>
    </motion.div>
  );
};
