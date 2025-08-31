import React from 'react';
import { Settings as SettingsIcon, Type, Volume2, Palette, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Settings } from '../types/quran';

interface SettingsProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
}

export const Settings: React.FC<SettingsProps> = ({ settings, onSettingsChange }) => {
  const handleSettingChange = (key: keyof Settings, value: string) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  const translations = [
    { id: 'en.asad', name: 'Muhammad Asad (English)', language: 'English' },
    { id: 'en.pickthall', name: 'Pickthall (English)', language: 'English' },
    { id: 'en.sahih', name: 'Sahih International (English)', language: 'English' },
    { id: 'ru.kuliev', name: 'Кулиев (Russian)', language: 'Русский' },
    { id: 'ru.porokhova', name: 'Порохова (Russian)', language: 'Русский' },
  ];

  const reciters = [
    { id: 'ar.alafasy', name: 'Мишари Рашид аль-Афаси' },
    { id: 'ar.husary', name: 'Махмуд Халиль аль-Хусари' },
    { id: 'ar.sudais', name: 'Абд ар-Рахман ас-Судайс' },
    { id: 'ar.minshawi', name: 'Мухаммад Сиддик аль-Миншави' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl p-6 mx-auto"
    >
      <div className="p-8 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
        <h2 className="flex items-center mb-6 text-3xl font-bold text-gray-800 dark:text-white">
          <SettingsIcon className="w-8 h-8 mr-3 text-green-600" />
          Настройки
        </h2>

        <div className="space-y-8">
          {/* Translation Settings */}
          <div>
            <h3 className="flex items-center mb-4 text-xl font-semibold text-gray-800 dark:text-white">
              <Globe className="w-5 h-5 mr-2 text-green-600" />
              Перевод
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {translations.map((translation) => (
                <motion.label
                  key={translation.id}
                  className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${
                    settings.translation === translation.id
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <input
                    type="radio"
                    name="translation"
                    value={translation.id}
                    checked={settings.translation === translation.id}
                    onChange={(e) => handleSettingChange('translation', e.target.value)}
                    className="mr-3 text-green-600 focus:ring-green-500"
                  />
                  <div>
                    <div className="font-medium text-gray-800 dark:text-white">
                      {translation.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {translation.language}
                    </div>
                  </div>
                </motion.label>
              ))}
            </div>
          </div>

          {/* Reciter Settings */}
          <div>
            <h3 className="flex items-center mb-4 text-xl font-semibold text-gray-800 dark:text-white">
              <Volume2 className="w-5 h-5 mr-2 text-green-600" />
              Чтец
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {reciters.map((reciter) => (
                <motion.label
                  key={reciter.id}
                  className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${
                    settings.reciter === reciter.id
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <input
                    type="radio"
                    name="reciter"
                    value={reciter.id}
                    checked={settings.reciter === reciter.id}
                    onChange={(e) => handleSettingChange('reciter', e.target.value)}
                    className="mr-3 text-green-600 focus:ring-green-500"
                  />
                  <div className="font-medium text-gray-800 dark:text-white">
                    {reciter.name}
                  </div>
                </motion.label>
              ))}
            </div>
          </div>

          {/* Font Size Settings */}
          <div>
            <h3 className="flex items-center mb-4 text-xl font-semibold text-gray-800 dark:text-white">
              <Type className="w-5 h-5 mr-2 text-green-600" />
              Размер шрифта
            </h3>
            <div className="flex space-x-3">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <motion.button
                  key={size}
                  onClick={() => handleSettingChange('fontSize', size)}
                  className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                    settings.fontSize === size
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {size === 'small' ? 'Малый' : size === 'medium' ? 'Средний' : 'Большой'}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Theme Settings */}
          <div>
            <h3 className="flex items-center mb-4 text-xl font-semibold text-gray-800 dark:text-white">
              <Palette className="w-5 h-5 mr-2 text-green-600" />
              Тема
            </h3>
            <div className="flex space-x-3">
              {(['light', 'dark'] as const).map((theme) => (
                <motion.button
                  key={theme}
                  onClick={() => handleSettingChange('theme', theme)}
                  className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                    settings.theme === theme
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {theme === 'light' ? 'Светлая' : 'Темная'}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="pt-6 mt-8 border-t border-gray-200 dark:border-gray-600">
          <motion.button
            onClick={() => {
              if (window.confirm('Сбросить все настройки к значениям по умолчанию?')) {
                onSettingsChange({
                  translation: 'en.asad',
                  reciter: 'ar.alafasy',
                  fontSize: 'medium',
                  theme: 'light',
                });
              }
            }}
            className="px-6 py-3 text-red-600 transition-colors rounded-lg dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Сбросить настройки
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};