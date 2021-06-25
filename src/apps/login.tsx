import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { ThemeContext, ThemeProvider } from 'styled-components';

import { Breeze, PinkBerry } from '../styles/themes';
import { AppContainer, GlobalStyles } from '../styles/styles';
import { Login } from '../components/Login';
import { Themes } from '../contexts/Theme';

const App = () => {
  const { theme } = useContext(ThemeContext);
  const getTheme = () => {
    switch (theme) {
      case Themes.PinkBerry: return PinkBerry;
      default: return Breeze;  
    }
  }

  return (
      <ThemeProvider theme={ getTheme() }>
        <GlobalStyles theme={ getTheme() } />
        <AppContainer>
          <Login />
        </AppContainer>
      </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
