import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Theme } from '../../types';

const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;
const SystemIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;

const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();

  // FIX: Changed type from `JSX.Element` to `React.ReactNode` to fix namespace error.
  const themes: { name: Theme; label: string; icon: React.ReactNode }[] = [
    { name: 'light', label: 'Світла', icon: <SunIcon /> },
    { name: 'dark', label: 'Темна', icon: <MoonIcon /> },
    { name: 'system', label: 'Системна', icon: <SystemIcon /> },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Налаштування</h1>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg max-w-md">
        <h2 className="text-xl font-semibold mb-4">Тема оформлення</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">Оберіть, як буде виглядати ваш щоденник.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {themes.map(t => (
            <button
              key={t.name}
              onClick={() => setTheme(t.name)}
              className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center transition-colors ${
                theme === t.name 
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/50' 
                  : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <div className="mb-2">{t.icon}</div>
              <span className="font-semibold">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;