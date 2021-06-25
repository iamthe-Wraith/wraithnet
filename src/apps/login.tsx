import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeStore } from '../contexts/Theme';
import { AppContainer, GlobalStyles } from '../styles/styles';
import { Theme } from '../components/Theme';
import { Login } from '../components/Login';

const App = () => {
  return (
    <ThemeStore>
      <Theme>
        <AppContainer>
          <Login />
        </AppContainer>
      </Theme>
    </ThemeStore>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
