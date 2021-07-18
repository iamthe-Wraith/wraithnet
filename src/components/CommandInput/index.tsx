import { observer } from 'mobx-react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../contexts/User';
import { TextInput } from '../TextInput';
import { Container } from './styles';

interface IProps {
    id: string;
    onSubmit: (command: string) => void;
    username?: string;
}

export const CommandInputBase: React.FC<IProps> = ({ id, onSubmit, username = '' }) => {
    const user = useContext(UserContext);
    const inputRef = useRef(null);
    const [command, setCommand] = useState<string>('');
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setCommand(e.target.value);

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSubmit(command);
            setCommand('');
        }
    }

    return (
        <Container>
            <div>{ `${user.username} $` }</div>
            <TextInput
                className='input'
                inputId={ id }
                inputRef={ ref => inputRef.current = ref }
                onChange={ onChange }
                onKeyDown={ onKeyDown }
                value={ command }
            />
        </Container>
    );
};

export const CommandInput = observer(CommandInputBase);
