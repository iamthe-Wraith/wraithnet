import { observer } from 'mobx-react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { TerminalContext } from '../../contexts/Terminal';
import { UserContext } from '../../contexts/User';
import { CommandType } from '../../models/command';
import { TerminalIpcRenderer as IpcRenderer } from '../../models/ipcRenderers/terminal';
import { CommandInput } from '../CommandInput';

import { Container, FeedItem } from './styles';

export const TerminalBase: React.FC = () => {
    const user = useContext(UserContext);
    const inputRef = useRef<HTMLDivElement>(null);
    const terminalModel = useContext(TerminalContext);
    const [inputDisabled, setInputDisabled] = useState(false);

    useEffect(() => {
        IpcRenderer
            .init()
            .then(() => IpcRenderer.initTerminal(terminalModel.execResponse));
    }, []);

    const onCommandSubmit = (command: string) => {
        setInputDisabled(true);
        terminalModel.exec(command)
            .finally(() => {
                setInputDisabled(false);
                inputRef.current.scrollIntoView();
            });
    }

    const onInputRef = (r: HTMLDivElement) => {
        inputRef.current = r;
    }

    const renderFeed = () => {
        return terminalModel.feed.map((f, i) => {
            const text = f.type === CommandType.COMMAND
                    ? `${user.username ?? '/'} $ ${f.command}`
                    : f.command

            return (
                <FeedItem key={ `command-${i}` } className={ f.type.toLowerCase() }>
                    { text }
                </FeedItem>
            );
        })
    }

    if (!user.username) {
        return (
            <span>Loading...</span>
        );
    }

    return (
        <Container htmlFor='command-input'>
            { renderFeed() }
            { !inputDisabled && (
                    <CommandInput
                        id='command-input'
                        onSubmit={ onCommandSubmit }
                        onCommandInputRef={ onInputRef }
                    />
                )
            }
        </Container>
    )
};

export const Terminal = observer(TerminalBase);