import React, { createContext, FC, useCallback, useState } from "react";

export enum Themes {
  Breeze = 'Breeze',
  PinkBerry = 'PinkBerry',
}

export const ThemeContext = createContext(null);

export const ThemeStore: FC = ({ children }) => {
  const [theme, setTheme] = useState(Themes.Breeze);

  const switchTheme = useCallback((newTheme: Themes) => setTheme(newTheme), [theme]);

  return (
    <ThemeContext.Provider value={ {switchTheme, theme} }>
      {children}
    </ThemeContext.Provider>
  );
};