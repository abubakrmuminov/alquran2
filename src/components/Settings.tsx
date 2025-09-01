import React from 'react';
import { Settings as SettingsIcon, Type, Volume2, Palette, Globe, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
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
    { id: 'en.asad', name: 'Muhammad Asad', language: 'English' },
    { id: 'en.pickthall', name: 'Pickthall', language: 'English' },
    { id: 'en.sahih', name: 'Sahih International', language: 'English' },
    { id: 'ru.kuliev', name: 'Кулиев', language: 'Russian' },
    { id: 'ru.porokhova', name: 'Порохова', language: 'Russian' },
  ];

  const reciters = [
    { id: 'ar.alafasy', name: 'Mishary Rashid Alafasy' },
    { id: 'ar.husary', name: 'Mahmoud Khalil Al-Husary' },
    { id: 'ar.sudais', name: 'Abdul Rahman As-Sudais' },
    { id: 'ar.minshawi', name: 'Muhammad Siddiq Al-Minshawi' },
  ];

  const fontSizes = [
    { id: 'small', name: 'Small', preview: 'Aa' },
    { id: 'medium', name: 'Medium', preview: 'Aa' },
    { id: 'large', name: 'Large', preview: 'Aa' },
  ];

  const themes = [
    { id: 'light', name: 'Light', icon: '☀️' },
    { id: 'dark', name: 'Dark', icon: '🌙' },
  ];

  return (
    <div className="min-h-screen pt-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl p-4 mx-auto sm:p-6"
      >
        <div className="p-8 glass rounded-3xl">
          <motion.h2 
            className="flex items-center mb-8 text-3xl font-bold text-white sm:text-4xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <SettingsIcon className="w-8 h-8 mr-3 text-blue-400" />
            Settings
          </motion.h2>

          <div className="space-y-10">
            {/* Translation Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="flex items-center mb-6 text-xl font-semibold text-white">
                <Globe className="w-6 h-6 mr-3 text-blue-400" />
                Translation
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {translations.map((translation, index) => (
                  <motion.label
                    key={translation.id}
                    className={`relative overflow-hidden cursor-pointer transition-all duration-300 rounded-2xl ${
                      settings.translation === translation.id
                        ? 'ring-2 ring-blue-500/50 bg-gradient-to-br from-blue-500/20 to-purple-500/20'
                        : 'glass hover:bg-white/5'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="p-4">
                      <input
                        type="radio"
                        name="translation"
                        value={translation.id}
                        checked={settings.translation === translation.id}
                        onChange={(e) => handleSettingChange('translation', e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                          settings.translation === translation.id
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-500'
                        }`}>
                          {settings.translation === translation.id && (
                            <div className="w-2 h-2 m-0.5 bg-white rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-white">
                            {translation.name}
                          </div>
                          <div className="text-sm text-gray-400">
                            {translation.language}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.label>
                ))}
              </div>
            </motion.div>

            {/* Reciter Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="flex items-center mb-6 text-xl font-semibold text-white">
                <Volume2 className="w-6 h-6 mr-3 text-blue-400" />
                Reciter
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {reciters.map((reciter, index) => (
                  <motion.label
                    key={reciter.id}
                    className={`relative overflow-hidden cursor-pointer transition-all duration-300 rounded-2xl ${
                      settings.reciter === reciter.id
                        ? 'ring-2 ring-blue-500/50 bg-gradient-to-br from-blue-500/20 to-purple-500/20'
                        : 'glass hover:bg-white/5'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="p-4">
                      <input
                        type="radio"
                        name="reciter"
                        value={reciter.id}
                        checked={settings.reciter === reciter.id}
                        onChange={(e) => handleSettingChange('reciter', e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                          settings.reciter === reciter.id
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-500'
                        }`}>
                          {settings.reciter === reciter.id && (
                            <div className="w-2 h-2 m-0.5 bg-white rounded-full"></div>
                          )}
                        </div>
                        <div className="font-medium text-white">
                          {reciter.name}
                        </div>
                      </div>
                    </div>
                  </motion.label>
                ))}
              </div>
            </motion.div>

            {/* Font Size Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="flex items-center mb-6 text-xl font-semibold text-white">
                <Type className="w-6 h-6 mr-3 text-blue-400" />
                Font Size
              </h3>
              <div className="flex flex-wrap gap-3">
                {fontSizes.map((size, index) => (
                  <motion.button
                    key={size.id}
                    onClick={() => handleSettingChange('fontSize', size.id)}
                    className={`px-6 py-4 rounded-2xl font-medium transition-all duration-300 ${
                      settings.fontSize === size.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'glass text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-2">
                      <span className={`font-bold ${
                        size.id === 'small' ? 'text-sm' : 
                        size.id === 'medium' ? 'text-base' : 'text-lg'
                      }`}>
                        {size.preview}
                      </span>
                      <span>{size.name}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Theme Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="flex items-center mb-6 text-xl font-semibold text-white">
                <Palette className="w-6 h-6 mr-3 text-blue-400" />
                Theme
              </h3>
              <div className="flex gap-4">
                {themes.map((theme, index) => (
                  <motion.button
                    key={theme.id}
                    onClick={() => handleSettingChange('theme', theme.id)}
                    className={`flex items-center px-6 py-4 space-x-3 rounded-2xl font-medium transition-all duration-300 ${
                      settings.theme === theme.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'glass text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="text-lg">{theme.icon}</span>
                    <span>{theme.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Reset Button */}
          <motion.div 
            className="pt-8 mt-10 border-t border-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={() => {
                if (window.confirm('Reset all settings to default values?')) {
                  onSettingsChange({
                    translation: 'en.asad',
                    reciter: 'ar.alafasy',
                    fontSize: 'medium',
                    theme: 'dark',
                  });
                }
              }}
              className="flex items-center px-6 py-3 space-x-2 text-red-400 transition-all duration-300 rounded-xl hover:text-red-300 hover:bg-red-500/10"
              whileHover={{ scale: 1.05, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-5 h-5" />
              <span className="font-medium">Reset to Defaults</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};