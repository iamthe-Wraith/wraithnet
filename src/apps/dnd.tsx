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

const App = () => (
  <TerminalStore>
    <UserStore>
      <DnDStore>
        <ImagesStore>
          <ThemeStore>
            <Theme>
              <HashRouter>
                <AppContainer>
                  <DnD />
                </AppContainer>
              </HashRouter>
            </Theme>
          </ThemeStore>
        </ImagesStore>
      </DnDStore>
    </UserStore>
  </TerminalStore>
);

ReactDOM.render(<App />, document.getElementById('root'));
