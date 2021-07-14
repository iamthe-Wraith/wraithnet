import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ThemeStore } from '../contexts/Theme';
import { AppContainer } from '../styles/styles';
import { Theme } from '../components/Theme';
import { Login } from '../components/Login';
import { LoginIpcRenderer as IpcRenderer } from '../models/ipcRenderers/login';

const App = () => {
  useEffect(() => {
    IpcRenderer.init();
  }, []);

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
