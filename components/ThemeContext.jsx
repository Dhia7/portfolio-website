import { useEffect } from 'react';

export const ThemeProvider = ({ children }) => {
  useEffect(() => {
    // Always set dark theme
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  return <>{children}</>;
};

