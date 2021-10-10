import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeStore } from '../contexts/Theme';
import { AppContainer } from '../styles/styles';
import { Theme } from '../components/Theme';
import { UserStore } from '../contexts/User';
import { TerminalStore } from '../contexts/Terminal';
import { DnD } from '../components/DnD';

const App = () => (
    <TerminalStore>
        <UserStore>
            <ThemeStore>
                <Theme>
                    <AppContainer>
                        <DnD />
                    </AppContainer>
                </Theme>
            </ThemeStore>
        </UserStore>
    </TerminalStore>
);

ReactDOM.render(<App />, document.getElementById('root'));
