import React, { createContext, useState, useEffect, useMemo } from 'react';
// FIX: Import AppSettings to provide explicit typing for the settings object.
import { AppSettings, Theme } from '../types';
import { get, set } from '../services/storage';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // FIX: Explicitly type the return value of `get` to AppSettings.
  // This ensures `get(...).theme` is of type `Theme`, resolving the type mismatch with `useState<Theme>`.
  const [theme, setThemeState] = useState<Theme>(() => get<AppSettings>('settings', { theme: 'system' }).theme);

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(isDark ? 'dark' : 'light');
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    // FIX: Consistently use explicit typing for settings to ensure type safety.
    const settings = get<AppSettings>('settings', { theme: 'system' });
    set('settings', { ...settings, theme: newTheme });
  };
  
  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
