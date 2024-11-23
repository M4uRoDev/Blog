'use client';

import { useTheme } from './ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center h-8 rounded-full w-16 focus:outline-none bg-gray-200 dark:bg-gray-800"
    >
      <span
        className={`${
          theme === 'light' ? 'translate-x-1' : 'translate-x-9'
        } inline-block w-6 h-6 transform bg-white rounded-full transition-transform flex items-center justify-center`}
      >
        <span
          className={`${
            theme === 'light' ? 'opacity-100' : 'opacity-0'
          } transition-opacity`}
        >
          🌞
        </span>
        <span
          className={`${
            theme === 'dark' ? 'opacity-100' : 'opacity-0'
          } transition-opacity absolute`}
        >
          🌜
        </span>
      </span>
    </button>
  );
};