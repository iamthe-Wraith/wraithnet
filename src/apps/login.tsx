// eslint-disable-next-line no-use-before-define
import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer, GlobalStyles } from '../styles/styles';
import { Login } from '../components/Login';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Login />
      </AppContainer>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
