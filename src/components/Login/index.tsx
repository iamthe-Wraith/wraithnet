import React, { FC, ChangeEvent, useState } from 'react';
import { IpcRenderer } from '../../models/ipcRenderer';
import { Button } from '../Button';
import { TextInput } from '../TextInput';
import { ButtonContainer, Container, InputWrapper } from './styles';

export const Login: FC<any> = ({ theme }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onCloseClick = () => IpcRenderer.close();

  const onLoginClick = () => {
    IpcRenderer.authenticate(username, password)
      .catch((err: Error) => {
        console.log('insiee <Login /> error: ', err);
        setError(err.message);
      });
  }

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);

  return (
    <Container theme={ theme }>
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
          value={ password }
        />
      </InputWrapper>
      {
        !!error && (
          <p>{ error }</p>
        )
      }
      <ButtonContainer>
        <Button
          disabled={ !password || !username }
          onClick={ onLoginClick }
        >
          login
        </Button>
        <Button onClick={ onCloseClick }>close</Button>
      </ButtonContainer>
    </Container>
  );
};
