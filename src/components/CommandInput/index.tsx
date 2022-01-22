import { observer } from 'mobx-react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../contexts/User';
import { TextArea } from '../TextArea';
import { Container } from './styles';

interface IProps {
    id: string;
    onCommandInputRef: (e: HTMLDivElement) => void;
    onSubmit: (command: string) => void;
    username?: string;
}

export const CommandInputBase: React.FC<IProps> = ({ onCommandInputRef, id, onSubmit }) => {
    const user = useContext(UserContext);
    const textareaRef = useRef(null);
    const [command, setCommand] = useState<string>('');
    const [commandInputHeight, setCommandInputHeight] = useState(35);
    useEffect(() => {
        textareaRef.current?.focus();
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommand(e.target.value);
        setCommandInputHeight(textareaRef.current.scrollHeight);
    };

    const onContainerRef = (r: HTMLDivElement) => {
        onCommandInputRef(r);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            onSubmit(command);
            setCommand('');
        } else if (e.key === 'u' && e.ctrlKey) {
            setCommand('');
        }
    };

    return (
        <Container ref={ onContainerRef }>
            <div>{ `${user.username} $` }</div>
            <TextArea
                className='textareaContainer'
                textareaClassName='textarea'
                textareaId={ id }
                textareaRef={ (ref: HTMLElement) => textareaRef.current = ref }
                onChange={ onChange }
                onKeyDown={ onKeyDown }
                style={ { height: `${commandInputHeight}px` } }
                value={ command }
            />
        </Container>
    );
};

export const CommandInput = observer(CommandInputBase);
