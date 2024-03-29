import React, { FC, ChangeEvent, useState, useEffect } from 'react';
import { LoginIpcRenderer as IpcRenderer } from '../../models/ipcRenderers/login';
import { IThemeProps } from '../../styles/themes';
import { Button, ButtonType } from '../Button';
import { TextInput } from '../TextInput';
import { ButtonContainer, Container, InputWrapper } from './styles';

export const Login: FC<IThemeProps> = ({ theme }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        IpcRenderer.loaded();
    }, []);

    const onCloseClick = () => IpcRenderer.closeApp();

    const onLoginClick = () => {
    IpcRenderer.authenticate(username, password)
        .catch((err: Error) => {
            console.log('inside <Login /> error');
            console.log(err.message);
            setError(err.message);
        });
    }

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);

    return (
    <Container theme={ theme }>
        <div>
            <h1>Login</h1>
            <InputWrapper>
                <TextInput
                    className='input'
                    inputId='username'
                    onChange={ onUsernameChange }
                    value={ username }
                />
            </InputWrapper>
            <InputWrapper>
                <TextInput
                    className='input'
                    inputId='password'
                    onChange={ onPasswordChange }
                    type='password'
                    value={ password }
                />
            </InputWrapper>
                {
                    !!error && <p className='error'>{ error }</p>
                }
            <ButtonContainer>
                <Button
                    buttonType={ ButtonType.PrimaryReverse }
                    className='button'
                    disabled={ !password || !username }
                    onClick={ onLoginClick }
                >
                    login
                </Button>
                <Button
                    buttonType={ ButtonType.Blank }
                    className='button'
                    onClick={ onCloseClick }
                >
                    close
                </Button>
            </ButtonContainer>
        </div>
    </Container>
    );
};
