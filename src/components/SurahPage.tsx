import React, { useState, useEffect } from "react";
import { ArrowLeft, StopCircle } from "lucide-react";
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
  const [bookmarks, setBookmarks] = useLocalStorage<Bookmark[]>(
    "bookmarks",
    []
  );
  const [, setLastRead] = useLocalStorage<LastRead | null>("lastRead", null);

  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
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

  // Останавливаем аудио при выходе со страницы
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        setCurrentAudio(null);
        setCurrentAyah(null);
      }
    };
  }, [currentAudio]);

  // Воспроизведение аята с автоплеем
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
        setCurrentAyah(ayah.numberInSurah);

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
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Загрузка...
      </div>
    );
  }

  if (!surahData || !translationData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="mb-4 text-red-500">Ошибка загрузки суры</p>
        <button
          onClick={onBack}
          className="flex items-center px-4 py-2 text-gray-200 transition bg-gray-700 rounded-lg hover:bg-gray-600"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Назад
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl p-6 mx-auto"
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-white">
          {surahData.name}
        </h1>
        <div className="text-gray-400">
          {surahData.englishName} — {surahData.englishNameTranslation}
        </div>
        <div className="mt-2 text-sm text-gray-500">
          {surahData.numberOfAyahs} аятов
        </div>
      </div>

      {/* Кнопки */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center px-3 py-2 text-gray-300 transition bg-gray-800 rounded-lg hover:bg-gray-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Назад
        </button>
        {currentAudio && (
          <button
            onClick={stopAudio}
            className="flex items-center px-3 py-2 text-red-400 transition rounded-lg bg-red-600/20 hover:bg-red-600/30"
          >
            <StopCircle className="w-4 h-4 mr-2" /> Остановить всё
          </button>
        )}
      </div>

      {/* Все аяты */}
      <div className="space-y-5">
        {surahData.ayahs.map((ayah: any, index: number) => {
          // Проверяем Бисмиллях
          const isBismillah = ayah.text.includes("بسم الله");
          const ayahNumber = isBismillah ? 0 : ayah.numberInSurah;

          return (
            <AyahCard
              key={ayah.number}
              ayah={{ ...ayah, numberInSurah: ayahNumber }}
              translation={translationData.ayahs[index]}
              surahNumber={surahNumber}
              surahName={surahData.englishName}
              settings={settings}
              isBookmarked={isBookmarked(ayahNumber)}
              onToggleBookmark={handleToggleBookmark}
              currentAyah={currentAyah}
              onPlay={() => playAyah(index)}
            />
          );
        })}
      </div>
    </motion.div>
  );
};