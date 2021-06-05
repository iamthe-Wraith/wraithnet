import React, { FC, ChangeEvent, useState } from 'react';
import { TextInput } from '../TextInput';

import { Container, InputWrapper } from './styles';

export const Login: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <Container>
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
    </Container>
  )
};
