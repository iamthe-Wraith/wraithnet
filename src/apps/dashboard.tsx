import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ThemeStore } from '../contexts/Theme';
import { AppContainer } from '../styles/styles';
import { Theme } from '../components/Theme';
import { DashboardIpcRenderer as IpcRenderer } from '../models/ipcRenderers/dashboard';
import { Dashboard } from '../components/Dashboard';
import { UserStore } from '../contexts/User';
import { HashRouter } from 'react-router-dom';
import { Toaster } from '../components/Toaster';
import { ErrorMessageModal } from '../components/ErrorMessageModal';
import { ErrorMessagesStore } from '../contexts/ErrorMessages';
import { ToasterStore } from '../contexts/Toaster';
import { ConfigStore } from '../contexts/Config';
import { TimeStore } from '../contexts/Time';

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
        <ErrorMessagesStore>
            <TimeStore>
                <ConfigStore>
                    <ToasterStore>
                        <UserStore>
                            <ThemeStore>
                                <Theme>
                                    <HashRouter>
                                        <AppContainer>
                                            <Dashboard />
                                            <Toaster />
                                            <ErrorMessageModal />
                                        </AppContainer>
                                    </HashRouter>
                                </Theme>
                            </ThemeStore>
                        </UserStore>
                    </ToasterStore>
                </ConfigStore>
            </TimeStore>
        </ErrorMessagesStore>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
