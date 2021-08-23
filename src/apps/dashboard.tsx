import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ThemeStore } from '../contexts/Theme';
import { AppContainer } from '../styles/styles';
import { Theme } from '../components/Theme';
import { DashboardIpcRenderer as IpcRenderer } from '../models/ipcRenderers/dashboard';
import { Dashboard } from '../components/Dashboard';
import { UserStore } from '../contexts/User';

const App = () => {
  useEffect(() => {
    IpcRenderer.init({
        onUserLogUpdate: () => console.log('userlog updated....retrieving updated stuff and things')
    })
        .then((results: any) => {
            console.log('init results: ', results);
        });
  }, []);

  return (
    <UserStore>
        <ThemeStore>
            <Theme>
                <AppContainer>
                    <Dashboard />
                </AppContainer>
            </Theme>
        </ThemeStore>
    </UserStore>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
