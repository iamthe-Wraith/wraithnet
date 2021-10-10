import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeStore } from '../contexts/Theme';
import { AppContainer } from '../styles/styles';
import { Theme } from '../components/Theme';
import { UserStore } from '../contexts/User';
import { TerminalStore } from '../contexts/Terminal';
import { DnD } from '../components/DnD';
import { CampaignsStore } from '../contexts/Campaigns';

const App = () => (
    <TerminalStore>
        <UserStore>
            <CampaignsStore>
                <ThemeStore>
                    <Theme>
                        <AppContainer>
                            <DnD />
                        </AppContainer>
                    </Theme>
                </ThemeStore>
            </CampaignsStore>
        </UserStore>
    </TerminalStore>
);

ReactDOM.render(<App />, document.getElementById('root'));
