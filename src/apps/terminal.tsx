import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ThemeStore } from '../contexts/Theme';
import { AppContainer } from '../styles/styles';
import { Theme } from '../components/Theme';
import { Terminal } from '../components/Terminal';
import { UserStore } from '../contexts/User';
import { TerminalStore } from '../contexts/Terminal';

const App = () => (
    <TerminalStore>
        <UserStore>
            <ThemeStore>
                <Theme>
                    <AppContainer>
                        <Terminal />
                    </AppContainer>
                </Theme>
            </ThemeStore>
        </UserStore>
    </TerminalStore>
);

ReactDOM.render(<App />, document.getElementById('root'));
