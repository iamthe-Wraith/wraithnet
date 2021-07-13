import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ThemeStore } from '../contexts/Theme';
import { AppContainer } from '../styles/styles';
import { Theme } from '../components/Theme';
import { IpcRenderer } from '../models/ipcRenderer';
import { Dashboard } from '../components/Dashboard';

const App = () => {
  useEffect(() => {
    IpcRenderer.init();
  }, []);

  return (
    <ThemeStore>
      <Theme>
        <AppContainer>
          <Dashboard />
        </AppContainer>
      </Theme>
    </ThemeStore>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
