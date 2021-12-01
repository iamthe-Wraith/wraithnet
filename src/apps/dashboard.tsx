import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ThemeStore } from '../contexts/Theme';
import { AppContainer } from '../styles/styles';
import { Theme } from '../components/Theme';
import { DashboardIpcRenderer as IpcRenderer } from '../models/ipcRenderers/dashboard';
import { Dashboard } from '../components/Dashboard';
import { UserStore } from '../contexts/User';
import { MainRouter } from '../components/MainRouter';
import { HashRouter } from 'react-router-dom';

const App = () => {
  useEffect(() => {
    IpcRenderer
      .init()
      .then(IpcRenderer.initDashboard)
      .then((results: any) => {
        console.log('initDashboard results: ', results);
      });
  }, []);

  return (
    <UserStore>
      <ThemeStore>
        <Theme>
          <HashRouter>
            <AppContainer>
              <Dashboard />
            </AppContainer>
          </HashRouter>
        </Theme>
      </ThemeStore>
    </UserStore>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<MainRouter />, document.getElementById('main'));
