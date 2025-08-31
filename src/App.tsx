import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { SurahPage } from './components/SurahPage';
import { Bookmarks } from './components/Bookmarks';
import { Settings } from './components/Settings';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Settings as SettingsType } from './types/quran';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [selectedAyah, setSelectedAyah] = useState<number | undefined>(undefined);
  const [settings, setSettings] = useLocalStorage<SettingsType>('settings', {
    translation: 'en.asad',
    reciter: 'ar.alafasy',
    fontSize: 'medium',
    theme: 'dark',
  });

  // Apply theme to document
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  const handleNavigateToSurah = (surahNumber: number, ayahNumber?: number) => {
    setSelectedSurah(surahNumber);
    setSelectedAyah(ayahNumber);
    setCurrentPage('surah');
  };

  const handleBackToDashboard = () => {
    setSelectedSurah(null);
    setSelectedAyah(undefined);
    setCurrentPage('dashboard');
  };

  const handleToggleTheme = () => {
    setSettings(prev => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark'
    }));
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard
            onNavigateToSurah={handleNavigateToSurah}
            settings={settings}
          />
        );
      case 'search':
        return (
          <Dashboard
            onNavigateToSurah={handleNavigateToSurah}
            settings={settings}
          />
        );
      case 'surah':
        return selectedSurah ? (
          <SurahPage
            surahNumber={selectedSurah}
            initialAyah={selectedAyah}
            onBack={handleBackToDashboard}
            settings={settings}
          />
        ) : null;
      case 'bookmarks':
        return <Bookmarks onNavigateToAyah={handleNavigateToSurah} />;
      case 'settings':
        return (
          <Settings
            settings={settings}
            onSettingsChange={setSettings}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen transition-colors ${settings.theme}`}>
      <Navigation 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        isDark={settings.theme === 'dark'}
        onToggleTheme={handleToggleTheme}
      />
      <main>
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;