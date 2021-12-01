import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { ThemeStore } from '../contexts/Theme';
import { AppContainer } from '../styles/styles';
import { Theme } from '../components/Theme';
import { UserStore } from '../contexts/User';
import { TerminalStore } from '../contexts/Terminal';
import { DnD } from '../components/DnD';
import { DnDStore } from '../contexts/DnD';
import { ImagesStore } from '../contexts/Images';
import { ToasterStore } from '../contexts/Toaster';
import { Toaster } from '../components/Toaster';
import { ErrorMessagesStore } from '../contexts/ErrorMessages';
import { ErrorMessageModal } from '../components/ErrorMessageModal';

const App = () => (
  <ErrorMessagesStore>
    <TerminalStore>
      <ToasterStore>
        <UserStore>
          <DnDStore>
            <ImagesStore>
              <ThemeStore>
                <Theme>
                  <HashRouter>
                    <AppContainer>
                      <DnD />
                      <Toaster />
                      <ErrorMessageModal />
                    </AppContainer>
                  </HashRouter>
                </Theme>
              </ThemeStore>
            </ImagesStore>
          </DnDStore>
        </UserStore>
      </ToasterStore>
    </TerminalStore>
  </ErrorMessagesStore>
);

ReactDOM.render(<App />, document.getElementById('root'));
