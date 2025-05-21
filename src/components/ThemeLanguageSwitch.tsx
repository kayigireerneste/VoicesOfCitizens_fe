import React from 'react';
import { Languages } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const languageTitles = {
  en: 'Switch to Kinyarwanda',
  rw: 'Hindura ururimi mu Cyongereza',
};

const ThemeLanguageSwitch: React.FC = () => {
  const { language, setLanguage } = useApp();

  const languageTitle = languageTitles[language] || 'Switch language';
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => setLanguage(language === 'en' ? 'rw' : 'en')}
        className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400"
        title={languageTitle}
      >
        <Languages size={20} />
        <span className="text-sm font-medium">{language === 'en' ? 'RW' : 'EN'}</span>
      </button>
    </div>
  );
};

export default ThemeLanguageSwitch;