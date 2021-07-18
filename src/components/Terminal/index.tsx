import { observer } from 'mobx-react';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/User';
import { CommandInput } from '../CommandInput';

import { OuterContainer, Container, FeedItem } from './styles';

export const TerminalBase: React.FC<any> = ({ theme }) => {
    const user = useContext(UserContext);
    const [feed, setFeed] = useState<string[]>([]);

    const onCommandSubmit = (command: string) => {
        setFeed([...feed, command]);
    }

    const renderFeed = () => {
        return feed.map((f, i) => {
            return (
                <FeedItem key={ `command-${i}` }>
                    {`${user.username} $ ${f}`}
                </FeedItem>
            );
        })
    }

    return (
        <OuterContainer theme={ theme }>
            <Container htmlFor='command-input'>
                { renderFeed() }
                <CommandInput id='command-input' onSubmit={ onCommandSubmit } />
            </Container>
        </OuterContainer>
    )
};

export const Terminal = observer(TerminalBase);