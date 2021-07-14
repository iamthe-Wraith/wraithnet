import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ThemeStore } from '../contexts/Theme';
import { AppContainer } from '../styles/styles';
import { Theme } from '../components/Theme';
import { TerminalIpcRenderer as IpcRenderer } from '../models/ipcRenderers/terminal';
import { Terminal } from '../components/Terminal';

const App = () => {
  useEffect(() => {
    IpcRenderer.init();
  }, []);

  return (
    <ThemeStore>
      <Theme>
        <AppContainer>
            <Terminal />
        </AppContainer>
      </Theme>
    </ThemeStore>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
