import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ThemeStore } from '../contexts/Theme';
import { AppContainer } from '../styles/styles';
import { Theme } from '../components/Theme';
import { IpcRenderer } from '../models/ipcRenderer';

const App = () => {
  useEffect(() => {
    IpcRenderer.init();
  }, []);

  return (
    <ThemeStore>
      <Theme>
        <AppContainer>
            Terminal
        </AppContainer>
      </Theme>
    </ThemeStore>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
